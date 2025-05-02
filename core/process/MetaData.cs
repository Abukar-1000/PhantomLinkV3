
namespace ProcessSpace {
    public class MetaData {
        public int id = -1;
        public string name = "";
        public bool? hasExited = false;
        public int threadCount = -1;
        public int? exitCode = -1;
        public DateTime? exitTime;
        public Priority priority = Priority.Normal;
        public ProcessTime processorTime = new ProcessTime();
        public ProcessMemory memory = new ProcessMemory();
    }

    public enum Priority {
        Idle = 4,
        Normal = 8,
        High = 13,
        RealTime = 24
    }
}