import * as signalR from '@microsoft/signalr';
import { Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { config } from '../../Config/config';

const defaultDimensions = {
    width: 1920,
    height: 1080
}

function DisplayDetails({ pdimensions = defaultDimensions, show }) {
    const [isMouseOver, setIsMouseOver] = useState(false)    

    return (
        <Box>

        </Box>
    );
}

export default function Display({ pdimensions = defaultDimensions, deviceId }) {
    const [dimensions, setDimensions] = useState(pdimensions);
    const width = `${dimensions.width}px`;
    const height = `${dimensions.height}px`;

    const [connection, setConnection] = useState(null);
    const [frame, setFrame] = useState({});

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(config.screenBrodcast) 
            .withAutomaticReconnect()
            .build();

            newConnection.start()
            .then(() => {
                console.log('Connected!');
                newConnection.invoke('JoinGroup', deviceId);
            })
            .catch(err => console.error('Connection failed: ', err));

            newConnection.on('ScreenFrameUpdate', (newFrame) => {
                // console.log("New Frame: ", newFrame);
                setFrame(newFrame);
            });

            setConnection(newConnection);

        return () => {
            newConnection.stop();
        };
    }, []);

    return (
        <Box
            sx={{

            }}
            >
            <Paper
                elevation={8}
            >
                <img
                    alt='stream-video'
                    src={`data:image/jpeg;base64,${frame.image}`}
                    style={{
                        width: "100%",
                        height: "100%",
                        "objectFit": "contain"
                    }}
                />
            </Paper>
        </Box>
    );
}