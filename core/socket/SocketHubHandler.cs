

using DeviceSpace;
using Microsoft.AspNetCore.SignalR;
using ProcessSpace;
using System.Threading.Tasks;


namespace SocketUtil {

    public interface IClientNotification {

        Task ReceiveNotification(string message);
    }

    public class SocketHub: Hub {

        // public override async Task OnConnectedAsync() {
        //     Console.WriteLine($"\n\tClient {Context.ConnectionId} has connected.🔥🔥\n");
        //     await Clients.All.SendAsync($"Client {Context.ConnectionId} has connected.");
        //     // await Clients.All.ReceiveNotification($"Client {Context.ConnectionId} has connected.");
        // }
        
        public async Task SendMessage(string user, string message)
        {
            ProcessPool pool = new ProcessPool(100);
            Console.WriteLine("", user, message);
            await Clients.Caller.SendAsync("ReceiveMessage", user, pool.ViewAllProcessJson());
            // await Clients.All.SendAsync("ReceiveMessage", user, pool.ViewAllProcessJson());
        }

        public async Task GetTasks(int? page = 0) {
            ProcessPool pool = new ProcessPool(100);
            Device device = new();
            device.display();
            
            string processes = pool.ViewAllProcessJson(page);
            await Clients.Caller.SendAsync("ReceiveTasks", processes);
        }

        public string GetConnectionId() {
            return this.Context.ConnectionId;
        }
        
        // public override Task OnDisconnected(bool stopCalled) {}
        // public override Task OnReconnected() {}
    }
}