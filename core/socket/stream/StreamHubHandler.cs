using Microsoft.AspNetCore.SignalR;
using SocketServices;

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

        public async Task SendMessage(string user, string message)
        {
            await Clients.Caller.SendAsync("ReceiveMessage", user, "1");
        }

        public async Task GetTasks(int? page = 0) {
            await Clients.Caller.SendAsync("ReceiveTasks", "1");
        }

        public string GetConnectionId() {
            return this.Context.ConnectionId;
        }
        
        // public override Task OnDisconnected(bool stopCalled) {}
        // public override Task OnReconnected() {}
    }
}