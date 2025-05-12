using DeviceSpace;

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
    }
}