
namespace ProcessSpace.Models {
    public class GetAllProcessesResponse {
        public string clientId { get; set; }
        public string deviceId { get; set; }
        public ProcessUpdateFrame process { get; set; }
    }
}