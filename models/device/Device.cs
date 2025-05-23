using System.Runtime.InteropServices;
using System;
using DisplaySpace;

namespace DeviceSpace.Models {

    public class Device
    {

        public string name { get; set; }
        public string version { get; set; }
        public string username { get; set; }
        public DisplaySpace.Display display { get; set; }

        public string id { get; set; }

        public Device(DeviceSpace.Device device) {
            name = device.Name;
            version = device.Version;
            username = device.Username;
            id = device.ID;
            display = device.GetDisplay();
        }

        public Device(
            string name,
            string version,
            string username,
            DisplaySpace.Display display,
            string id
        )
        {
            this.name = name;
            this.version = version;
            this.username = username;
            this.display = display;
            this.id = id;
        }
    }
}