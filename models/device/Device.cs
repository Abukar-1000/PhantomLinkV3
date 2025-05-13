using System;
using ProcessSpace.Models;
using DeviceSpace;

namespace ProcessSpace.Models.Device {

    public class Device {

        public string name  { get; set; }
        public string version  { get; set; }
        public string username  { get; set; }
        public string id { get; set; }
        
        public Device() {}
        public Device(DeviceSpace.Device device) {
            name = device.Name;
            version = device.Version;
            username = device.Username;
            id = device.ID;
        }
    }
}