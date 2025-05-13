namespace ProcessSpace.Models {

    public class ProcessUpdateFrame {
        public string deviceID { get; set; }
        public string processName { get; set; }
        public string status { get; set; }
        public List<UInt32> processIds { get; set; }
        public string timestamp { get; set; }

        public override string ToString() {
            string procIDs = string.Join(" ", this.processIds.Select(x => x.ToString()).ToArray());
            return $"ID:  {deviceID}\tProcess:  {processName}\tStatus:  {status}\tIDs:  {procIDs}\tTime:  {timestamp.ToString()}";
        }
    }
}