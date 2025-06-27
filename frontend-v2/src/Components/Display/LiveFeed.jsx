import * as signalR from '@microsoft/signalr';
import { Box, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { config } from '../../Config/config';



export default function LiveFeed({ deviceId }) {
    const [frame, setFrame] = useState({});
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(config.screenBrodcast) 
            .withAutomaticReconnect()
            .build();

            newConnection.start()
            .then(() => {
                console.log('Connected!');
                newConnection?.invoke('JoinGroup', deviceId);
            })
            .catch(err => console.error('Connection failed: ', err));

            newConnection?.on('ScreenFrameUpdate', (newFrame) => {
                setFrame(newFrame);
            });

            setConnection(newConnection);

        return () => {
            newConnection.stop();
        };
    }, []);

    return (
        <>
            <img
                    alt='stream-video'
                    src={`data:image/jpeg;base64,${frame.image}`}
                    style={{
                        width: "100%",
                        height: "100%",
                        "objectFit": "contain"
                    }}
                />
        </>
    )
}