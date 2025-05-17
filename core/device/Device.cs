using System;
using ProcessSpace.Models;
using DisplaySpace;
using Register.Models;

namespace DeviceSpace {

    public class Device
    {

        protected string name = Environment.MachineName;
        protected string version = Environment.Version.ToString();
        protected string username = Environment.UserName;
        protected string connectionId;
        protected Dictionary<string, ProcessUpdateFrame> processFrames = new();
        protected DisplaySpace.Display display;

        public string id;

        public string Name
        {
            get => name;
        }

        public string Version
        {
            get => version;
        }

        public string Username
        {
            get => username;
        }

        public string ID
        {
            get => id;
        }

        public string ConnectionId
        {
            get => connectionId;
            set => connectionId = value;
        }


        public Device()
        {
            this.id = this.name + this.username + this.version;
        }

        public Device(RegisterFrame device)
        {
            this.name = device.name;
            this.version = device.version;
            this.username = device.username;
            this.id = device.id;
            this.display = device.display;
        }

        public Device(string connectionId)
        {
            this.id = this.name + this.username + this.version;
            this.connectionId = connectionId;
        }

        public void DisplayInfo()
        {
            Console.WriteLine($"\t {this.name} \t");
            Console.WriteLine($"\t {this.version} \t");
            Console.WriteLine($"\t {this.username} \t");
            Console.WriteLine($"\t {this.display.ToString()} \t");
        }

        public void UpdateProcess(ProcessUpdateFrame updateFrame)
        {
            this.processFrames[updateFrame.processName] = updateFrame;
        }

        public ProcessUpdateFrame? GetProcessUpdateFrame(string processName)
        {
            bool frameDoesNotExist = processFrames.ContainsKey(processName) == false;

            if (frameDoesNotExist)
            {
                return null;
            }

            return this.processFrames[processName];
        }
        
        public DisplaySpace.Display GetDisplay()
        {
            return display;
        }
        
    }
}