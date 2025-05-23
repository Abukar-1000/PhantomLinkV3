using DeviceSpace;
using DisplayModels = Display.Models;
using DisplaySpace;
using Microsoft.AspNetCore.SignalR;
using SocketServices;
using Display.Models;

/*
    Users will be allowed to:
        - join a group
        - leave a group
        - request a device to start streaming
            - Should users be allowed to be a part of multiple groups?
    
    Only devices are allowed to brodcase serialized image frames
*/
namespace SocketUtil.Stream {
    public enum StreamRequest {
        STREAM,
        START,
        STOP
    }

    public class StreamHub: Hub {
        
        private readonly DeviceService _deviceService;
        public async Task JoinGroup(string group) {

            string user = Context.ConnectionId;
            if (group is null || group.Length == 0) {
                await Clients.Caller.SendAsync("ConnectToGroup", new  {
                    Status = StatusCodes.Status400BadRequest,
                    Cause = "Group not provided."
                });
            }

            if (user is null || user.Length == 0) {
                await Clients.Caller.SendAsync("ConnectToGroup", new  {
                    Status = StatusCodes.Status400BadRequest,
                    Cause = "User not provided."
                });
            }

            await Groups.AddToGroupAsync(user, group);
        }

        public async Task GetResolutionOptions(string deviceID)
        {
            List<DisplayModels.ResolutionOption> options = new();
            Device device = _deviceService.Get(deviceID);
            DisplaySpace.Display display = device.GetDisplay();

            foreach (DisplayType type in Enum.GetValues(typeof(DisplayType)))
            {
                if (type <= display.type)
                {
                    options.Add(new DisplayModels.ResolutionOption(
                        (int)type,
                        type.GetStringType(),
                        type.GetDimensions()
                    ));
                }
            }
            
            await Clients.Caller.SendAsync("ReceiveResolutionOptions", options);
        }

        public async Task BrodcastFrame(ScreenFrame frame)
        {
            Console.WriteLine("\n\n");
            Console.WriteLine($"[{frame.id}]\t Frame recieved {frame.image.Length} {frame.width}x{frame.height}");
            await Clients.Group(frame.id).SendAsync("ScreenFrameUpdate", frame);
        }

        public async Task GetTasks(int? page = 0)
        {
            await Clients.Caller.SendAsync("ReceiveTasks", "1");
        }

        public string GetConnectionId() {
            return this.Context.ConnectionId;
        }
        
        // public override Task OnDisconnected(bool stopCalled) {}
        // public override Task OnReconnected() {}
    }
}