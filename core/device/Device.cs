using System;
using ProcessSpace.Models;
namespace DeviceSpace {

    public class Device {

        protected string name = Environment.MachineName;
        protected string version = Environment.Version.ToString();
        protected string username = Environment.UserName;
        protected string connectionId;
        protected Dictionary<string, ProcessUpdateFrame> processFrames = new();
        public string id;

        public string Name {
            get => name;
        }

        public string Version {
            get => version;
        }

        public string Username {
            get => username;
        }

        public string ID {
            get => id;
        }
        
        public string ConnectionId {
            get => connectionId;
            set => connectionId = value;
        }


        public Device() {
            this.id = this.name + this.username + this.version;
        }

        public Device(string connectionId) {
            this.id = this.name + this.username + this.version;
            this.connectionId = connectionId;
        }

        public void display() {
            Console.WriteLine($"\t {this.name} \t");
            Console.WriteLine($"\t {this.version} \t");
            Console.WriteLine($"\t {this.username} \t");
        }

        public void UpdateProcess(ProcessUpdateFrame updateFrame) {
            this.processFrames[updateFrame.processName] = updateFrame;
        }

        public ProcessUpdateFrame? GetProcessUpdateFrame(string processName) {
            bool frameDoesNotExist = processFrames.ContainsKey(processName) == false;

            if (frameDoesNotExist) {
                return null;
            }

            return this.processFrames[processName];
        }
        
    }
}