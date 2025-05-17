


using DeviceSpace;
using Microsoft.AspNetCore.SignalR;
using ProcessSpace;
using ProcessSpace.Models;
using SocketServices;
using System.Threading.Tasks;

namespace SocketUtil {
    public class ProcessHub: Hub {
        private readonly DeviceService _deviceService;

        public ProcessHub(DeviceService deviceService) {
            _deviceService = deviceService;
        }

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

            Console.WriteLine($"Group {group} => User: {user}");
            await Groups.AddToGroupAsync(user, group);
        }

        public async Task UpdateProcess(ProcessUpdateFrame frame) {
            string response =  $"ID: {frame.deviceID}\t{frame.processName} with status ${StatusCodes.Status200OK}";
            Console.WriteLine(frame.ToString() + $"\t from: {Context.ConnectionId}");
            Device device = _deviceService.Get(frame.deviceID);
            if (device is null) {
                // Handle unregistered device
                response =  $"{frame.deviceID} not registered. Status ${StatusCodes.Status400BadRequest}";
                await Clients.Caller.SendAsync("ProcessUpdateResponse", response);
                return; 
            }

            if (device.ConnectionId != Context.ConnectionId) {
                device.ConnectionId = Context.ConnectionId;
            }

            device.UpdateProcess(frame);
            await Clients.Group(device.id).SendAsync("ProcessUpdate", frame);
            await Clients.Caller.SendAsync("ProcessUpdateResponse",response); 
        }

        public async Task KillProcessRequest(ProcessKillFrame frame) {
            Device? device = _deviceService?.Get(frame.deviceId);
            var previousFrame = device?.GetProcessUpdateFrame(frame.processName);

            
            Console.WriteLine($"Sending Kill request {frame.processName} \tConnectionID: {device?.ConnectionId} \tPrev Frame: {previousFrame.processName}");
            if (previousFrame is null || device is null) {
                await Clients.Caller.SendAsync("ProcessKillResponse", StatusCodes.Status404NotFound);
                return; 
            }

            // Send kill reaquest to device
            await Clients.Client(device.ConnectionId).SendAsync("ProcessKillRequest", frame);
        }

        public async Task KillProcessResponse(ProcessKillFrameResponse frame) {
            Device? device = _deviceService?.Get(frame.deviceId);
            var previousFrame = device?.GetProcessUpdateFrame(frame.processName);

            // Handle this 
            if (previousFrame is null || device is null) {
                await Clients.Caller.SendAsync("ProcessKillResponse", StatusCodes.Status404NotFound);
                return; 
            }

            Console.WriteLine($"Kill Response: {frame.processName} \tStatus: {frame.response}");
            if (frame.response == StatusCodes.Status200OK) {
                previousFrame.status = ProcessHub.InverseStatus(previousFrame.status);
                await UpdateProcess(previousFrame);
            }
        }

        // Should not inverse ( refactor )
        protected static string InverseStatus(string status) {
            if (status == "Alive") {
                return "Dead";
            }
            return "Alive";
        }
    }
}