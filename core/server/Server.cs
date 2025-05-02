
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Mvc;
using SocketUtil;

/**
    - Think about how a client will connect to a socket 
    - What data will be sent from the client to the server
    - How to dynamically add new requests from clients W/O breaking existing code
**/

namespace SocketServer {
    [ApiController]
    [Route("api/{controller}")]
    public class ServerController :  ControllerBase {
        
        // Update the line below to reflect the change
        
        private readonly IHubContext<SocketHub> _hubContext;
        public ServerController(IHubContext<SocketHub> hubContext) {
            _hubContext = hubContext;
        }

        [HttpPost("kill")]
        public async Task<IActionResult> KillProcess(string process) {
            await this._hubContext.Clients.All.SendAsync($"Killing process {process}");
            return Ok();
        }

        [HttpPost("subscribe")]
        public async Task<IActionResult> Subscribe(string id) {
            await this._hubContext.Clients.All.SendAsync($"{id}\t requests to subcsribe");
            return Ok();
        }

        public ServerController() {}
    }
}