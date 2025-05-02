
namespace ProcessSpace {
    public class ProcessMemory {
        public MemoryUsage pagedM = new MemoryUsage(); 
        public MemoryUsage systemM = new MemoryUsage(); 
        public MemoryUsage virtualM = new MemoryUsage(); 
        public MemoryUsage physicalM = new MemoryUsage(); 
    }

    public class MemoryUsage {
        public long? peakSize;
        public long? size;
    }
}