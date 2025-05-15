

using DeviceSpace;
using Microsoft.AspNetCore.SignalR;
using ProcessSpace;
using SocketServices;
using System.Threading.Tasks;


namespace SocketUtil {

    public interface IClientNotification {

        Task ReceiveNotification(string message);
    }

    public class SocketHub: Hub {

        private readonly DeviceService _deviceService;
        // public override async Task OnConnectedAsync() {
        //     Console.WriteLine($"\n\tClient {Context.ConnectionId} has connected.🔥🔥\n");
        //     await Clients.All.SendAsync($"Client {Context.ConnectionId} has connected.");
        //     // await Clients.All.ReceiveNotification($"Client {Context.ConnectionId} has connected.");
        // }
        
        public SocketHub(DeviceService deviceService) {
            _deviceService = deviceService;
        }

        // remove
        public async Task SendMessage(string user, string message)
        {
            ProcessPool pool = new ProcessPool(100);
            Console.WriteLine("", user, message);
            await Clients.Caller.SendAsync("ReceiveMessage", user, pool.ViewAllProcessJson());
            // await Clients.All.SendAsync("ReceiveMessage", user, pool.ViewAllProcessJson());
        }

        public async Task GetAllDevices() {
            await Clients.Caller.SendAsync("ReceiveDevices", _deviceService.GetAllDevices());
        }

        // remove
        public async Task GetTasks(int? page = 0) {
            ProcessPool pool = new ProcessPool(100);
            Device device = new();
            device.display();
            
            string processes = pool.ViewAllProcessJson(page);
            await Clients.Caller.SendAsync("ReceiveTasks", processes);
        }

        public async void RegisterDevice(Device device) {
            string deviceConnectionID = Context.ConnectionId;
            bool alreadyRegistered =  _deviceService.Get(device.ID) is not null;
            
            if (alreadyRegistered) {
                await Clients.Caller.SendAsync("RegisterResponse", StatusCodes.Status201Created);
                return; 
            }

            device.ConnectionId = deviceConnectionID;
            this._deviceService.Add(
                device.id,
                device 
            );

            await Groups.AddToGroupAsync(device.id, deviceConnectionID);
            await Clients.Caller.SendAsync("RegisterResponse", StatusCodes.Status200OK); 
        }

        // public override Task OnDisconnected(bool stopCalled) {}
        // public override Task OnReconnected() {}
    }
}