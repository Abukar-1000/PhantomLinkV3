using DeviceSpace;
using ProcessSpace.Models;
using DeviceModel = DeviceSpace.Models;

namespace SocketServices {
    public class DeviceService {

        private readonly Dictionary<string, Device> _devices = new();

        public void Add(string key, Device device) {
            _devices[key] = device;
        }

        public Device? Get(string key) {
            _devices.TryGetValue(key, out Device? device);
            return device;
        }

        public int Count() {
            return this._devices.Count;
        }

        public void UpdateProcess(ProcessUpdateFrame updateFrame) {
            Device device= _devices[updateFrame.deviceID];
            device.UpdateProcess(updateFrame);
        }

        public List<DeviceModel.Device> GetAllDevices() {
            return _devices.Values.Select(device => new DeviceModel.Device(device)).ToList();
        }
    }
}