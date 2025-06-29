

// HeartbeatFrame


namespace HardwarePerformance.Models
{
    public class HeartbeatFrame
    {
        public CPUData CPU { get; set; }
        public GPUData GPU { get; set; }
        public MemoryData Memory { get; set; }

        public string id { get; set; }
    }
}