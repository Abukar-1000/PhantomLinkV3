using System.Runtime.InteropServices;
using System;
namespace DeviceSpace {

    public class Device {

        protected string name = Environment.MachineName;
        protected string version = Environment.Version.ToString();
        protected string username = Environment.UserName;

        public Device() {}

        public void display() {
            Console.WriteLine($"\t {this.name} \t");
            Console.WriteLine($"\t {this.version} \t");
            Console.WriteLine($"\t {this.username} \t");
        }
    }
}