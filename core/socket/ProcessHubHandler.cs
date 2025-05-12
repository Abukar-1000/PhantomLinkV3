


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

        public async Task UpdateProcess(ProcessUpdateFrame frame) {
            string response =  $"ID: {frame.deviceID}\t{frame.processName} with status ${StatusCodes.Status200OK}";
            Console.WriteLine(frame.ToString());
            await Clients.Caller.SendAsync("ProcessUpdateResponse",response); 
        }
    }
}