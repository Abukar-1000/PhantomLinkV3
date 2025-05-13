import * as signalR from '@microsoft/signalr';
import { Box, Grid } from '@mui/material';
import { config } from '../../Config/config';
import { useEffect, useState } from "react";
import DeviceOption from './DeviceOption';



export default function DevicePannel() {
    
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [connection, setConnection] = useState(null);
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
                            .withUrl(config.socket, {
                                withCredentials: true
                            })
                            .configureLogging(signalR.LogLevel.Information)
                            .build();
        
        connection.on("ReceiveDevices", (newDevices) => {
            console.log("new devices", newDevices);
            setLoading(false);
            setDevices(newDevices);
        });

        connection.start()
            .then(async () => {
                console.log("Connected to SignalR hub");
                await connection.invoke("GetAllDevices")
            })
            .catch(error => console.error("Error connecting to SignalR hub:", error));
        
        setConnection(connection);
        
        return () => {
            connection.stop();
        };
    }, []);

    return (
        <Box>
            {
                loading && (<h1>Loading</h1>)
            }
            {
                devices && (
                    <Grid 
                        container
                        gap={1}
                    >
                        {
                            devices.map((device, id) => {
                                console.log(device);
                                const baseId = id * 10;
                                return (
                                    <Grid size={{ xs: 3 }}>
                                        <DeviceOption device={device}/>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                )
            }
        </Box>
    );
}