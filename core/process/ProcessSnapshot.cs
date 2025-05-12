

namespace ProcessSpace {

    public enum SnapshotStatus {
        InOld = -2,
        InCurrent = -1,
        InBoth = 1,
        Undecided
    };

    public class ProcessSnapshot {
        public string deviceID;
        public string processName;
        public ProcessStatus status;
        public ProcessGroup group;
        public ProcessSnapshot() {}
        public ProcessSnapshot(
            string processName, 
            ProcessStatus status, 
            ProcessGroup group,
            string deviceID
        ) {
            this.processName = processName;
            this.status = status;
            this.group = group;
            this.deviceID = deviceID;
        }
    }
}