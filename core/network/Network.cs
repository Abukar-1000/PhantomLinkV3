// should return available network addresses
using NetworkModels = NetworkSpace.Models;
using System.Net.Sockets;
using System.Net.NetworkInformation;
using System.Net;

namespace NetworkSpace
{
    public class Network
    {
        protected NetworkModels.Network networkOptions = new();
        public Network()
        {
            this.ConfigureOptions();
        }

        public Network(NetworkInterfaceType _type)
        {
            this.ConfigureOptions(_type);
        }

        protected void ConfigureOptions()
        {
            this.networkOptions.Name = Dns.GetHostName();
            IPHostEntry host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (var address in host.AddressList)
            {
                if (address.AddressFamily == AddressFamily.InterNetwork && this.IsProtectIPV4(address))
                {
                    this.networkOptions.IPV4Address = address.MapToIPv4().ToString();
                }
                else if (address.AddressFamily == AddressFamily.InterNetworkV6)
                {
                    this.networkOptions.IPV6Address = address.ToString();
                }
            }
        }

        public void ConfigureOptions(NetworkInterfaceType _type)
        {
            this.networkOptions.Name = Dns.GetHostName();
            foreach (NetworkInterface item in NetworkInterface.GetAllNetworkInterfaces())
            {
                if (item.NetworkInterfaceType == _type && item.OperationalStatus == OperationalStatus.Up)
                {
                    foreach (UnicastIPAddressInformation ip in item.GetIPProperties().UnicastAddresses)
                    {
                        if (ip.Address.AddressFamily == AddressFamily.InterNetwork && this.IsProtectIPV4(ip.Address))
                        {
                            this.networkOptions.IPV4Address = ip.Address.ToString();
                        }
                        else if (ip.Address.AddressFamily == AddressFamily.InterNetworkV6)
                        {
                            this.networkOptions.IPV6Address = ip.Address.ToString();
                        }
                    }
                }
            }
        }

        protected bool IsProtectIPV4(IPAddress address)
        { 
            return address.ToString().Contains("10.0.0");
        }

        public NetworkModels.Network GetOptions()
        {
            return this.networkOptions;
        }
    }
}