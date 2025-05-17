

using DeviceSpace;
using Microsoft.AspNetCore.SignalR;
using ProcessSpace;
using Register.Models;
using SocketServices;
using System.Threading.Tasks;
using DeviceModels = DeviceSpace.Models;

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
        }

        public async Task GetAllDevices() {
            await Clients.Caller.SendAsync("ReceiveDevices", _deviceService.GetAllDevices());
        }

        // remove
        public async Task GetTasks(int? page = 0) {
            ProcessPool pool = new ProcessPool(100);
            Device device = new();
            device.DisplayInfo();
            
            string processes = pool.ViewAllProcessJson(page);
            await Clients.Caller.SendAsync("ReceiveTasks", processes);
        }

        public async void RegisterDevice(RegisterFrame frame) {
            string deviceConnectionID = Context.ConnectionId;
            bool alreadyRegistered =  _deviceService.Get(frame.id) is not null;
            
            if (alreadyRegistered) {
                await Clients.Caller.SendAsync("RegisterResponse", StatusCodes.Status201Created);
                return; 
            }

            Device _device = new Device(frame); 
            _device.ConnectionId = deviceConnectionID;
            this._deviceService.Add(
                frame.id,
                _device 
            );

            await Groups.AddToGroupAsync(frame.id, deviceConnectionID);
            await Clients.Caller.SendAsync("RegisterResponse", StatusCodes.Status200OK); 
        }

        // public override Task OnDisconnected(bool stopCalled) {}
        // public override Task OnReconnected() {}
    }
}