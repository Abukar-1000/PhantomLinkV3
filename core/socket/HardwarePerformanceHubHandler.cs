using DeviceSpace;
using DisplayModels = Display.Models;
using DisplaySpace;
using Microsoft.AspNetCore.SignalR;
using SocketServices;
using Display.Models;
using HardwarePerformance.Models;



namespace SocketUtil.Hardware
{

    public class HardwarePerformanceHub : Hub
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

        public async Task BrodcastPerformance(HeartbeatFrame frame)
        {
            await Clients.Group(frame.id).SendAsync("HeartbeatFrameUpdate", frame);
            await Clients.Caller.SendAsync("HeartbeatFrameResponse", frame);
        }
        
    }
}