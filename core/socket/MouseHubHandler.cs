using DeviceSpace;
using DisplayModels = Display.Models;
using DisplaySpace;
using Microsoft.AspNetCore.SignalR;
using SocketServices;
using Display.Models;
using MouseSpace.Models;



namespace SocketUtil.Stream
{
    public class MouseHub : Hub
    {

        private readonly DeviceService _deviceService;
        public async Task JoinGroup(string group)
        {

            string user = Context.ConnectionId;
            if (group is null || group.Length == 0)
            {
                await Clients.Caller.SendAsync("ConnectToGroup", new
                {
                    Status = StatusCodes.Status400BadRequest,
                    Cause = "Group not provided."
                });
            }

            if (user is null || user.Length == 0)
            {
                await Clients.Caller.SendAsync("ConnectToGroup", new
                {
                    Status = StatusCodes.Status400BadRequest,
                    Cause = "User not provided."
                });
            }

            await Groups.AddToGroupAsync(user, group);
        }

        public async Task MoveTo(MouseMoveFrame frame)
        {
            Console.WriteLine("\n\n");
            Console.WriteLine($"[{frame.id}]\t Move Frame recieved => ({frame.x}, {frame.y}) {frame.viewPortDimensions.width}x{frame.viewPortDimensions.height}");

            Device? device = _deviceService?.Get(frame.id);
            if (device is null) {
                await Clients.Caller.SendAsync("MouseMoveResponse", StatusCodes.Status404NotFound);
                return; 
            }
            
            // brodcast to device id
            await Clients.Client(device.ConnectionId).SendAsync("MouseMoveRequest", frame);
        }

        public string GetConnectionId()
        {
            return this.Context.ConnectionId;
        }

        // public override Task OnDisconnected(bool stopCalled) {}
        // public override Task OnReconnected() {}
    }
}