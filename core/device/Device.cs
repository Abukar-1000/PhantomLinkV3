using System;
using ProcessSpace.Models;
namespace DeviceSpace {

    public class Device {

        protected string name = Environment.MachineName;
        protected string version = Environment.Version.ToString();
        protected string username = Environment.UserName;
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
        

        public Device() {
            this.id = this.name + this.username + this.version;
        }

        public void display() {
            Console.WriteLine($"\t {this.name} \t");
            Console.WriteLine($"\t {this.version} \t");
            Console.WriteLine($"\t {this.username} \t");
        }

        public void UpdateProcess(ProcessUpdateFrame updateFrame) {
            this.processFrames[updateFrame.processName] = updateFrame;
        }
        
    }
}