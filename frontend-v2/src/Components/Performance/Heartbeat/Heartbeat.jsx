import * as signalR from '@microsoft/signalr';
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { config } from '../../../Config/config';
import HeartbeatCard from './HeartbeatCard';
import LoadingHeartbeatCard from './LoadingHeartbeatCard';



export default function Heartbeat({ deviceId }) {
    const [heartbeat, setHeartbeat] = useState({});
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(config.hardware.performance) 
            .withAutomaticReconnect()
            .build();

            newConnection.start()
            ?.then(() => {
                console.log('Connected!');
                newConnection?.invoke('JoinGroup', deviceId);
            })
            .catch(err => console.error('Connection failed: ', err));

            newConnection?.on('HeartbeatFrameUpdate', (heartbeat) => {
                setHeartbeat(heartbeat);
            });

            setConnection(newConnection);

        return () => {
            newConnection?.stop();
        };
    }, []);

    return (
        <>
            <Stack
                gap={2}
                direction={"row"}
                display={"flex"}
                justifyContent={"space-around"}
                alignContent={"space-around"}
            >
                {
                    
                    (
                       heartbeat?.cpu?.value === undefined ? 
                        <LoadingHeartbeatCard /> : 
                        <HeartbeatCard value={heartbeat?.cpu?.value} metric={"CPU"}/>
                    )
                }
                {
                    
                    (
                       heartbeat?.memory?.value === undefined ? 
                        <LoadingHeartbeatCard /> : 
                        <HeartbeatCard value={heartbeat?.memory?.value} metric={"Ram"}/>
                    )
                }
                {
                    
                    (
                       heartbeat?.gpu?.value === undefined ? 
                        <LoadingHeartbeatCard /> : 
                        <HeartbeatCard value={heartbeat?.gpu?.value} metric={"GPU"}/>
                    )
                }
            </Stack>
        </>
    )
}