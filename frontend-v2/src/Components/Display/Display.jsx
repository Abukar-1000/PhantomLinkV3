import * as signalR from '@microsoft/signalr';
import { Box, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
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
    
    const [viewportDimensions, setViewportDimensions] = useState({
        width: 0,
        height: 0,
    });
    const viewportRef = useRef();
    const [mousePosition, setMousePosition] = useState({
        x: null,
        y: null
    })
    
    const [connection, setConnection] = useState(null);
    const [frame, setFrame] = useState({});

    useEffect(() => {
        const getViewPortDimensionsCallback = () => {
            
            if (viewportRef.current) {
                const { current } = viewportRef;
                const boundingRectangle = current.getBoundingClientRect();
                const { width, height } = boundingRectangle;
                setViewportDimensions({
                    width:  Math.round(width),
                    height: Math.round(height)
                });
            }
        }
        
        const isInitialLoad = viewportDimensions.width === 0 && viewportDimensions.height === 0;
        if (isInitialLoad) {
            getViewPortDimensionsCallback();   
        }

        window.addEventListener("resize", getViewPortDimensionsCallback);
        return () => window.removeEventListener('resize', getViewPortDimensionsCallback);
    }, []);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(config.mouse) 
            .withAutomaticReconnect()
            .build();

            newConnection.start()
            .then(() => {
                console.log('Connected!');
                newConnection.invoke('JoinGroup', deviceId);
                
                const isInitialLoad = mousePosition.x === null && mousePosition.y === null;
                console.log(`MoveTo: (${mousePosition.x}, ${mousePosition.y})`);                
                newConnection?.invoke("MoveTo", {
                    x: mousePosition.x,
                    y: mousePosition.y,
                    id: deviceId,
                    viewPortDimensions: {
                        width: viewportDimensions.width,
                        height: viewportDimensions.height
                    }
                });
                
                if (!isInitialLoad) {
                }
            })
            .catch(err => console.error('Connection failed: ', err));


            setConnection(newConnection);

        return () => {
            newConnection.stop();
        };
    }, [mousePosition.x, mousePosition.y]);

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

    
    console.log(`AT: (${mousePosition.x}, ${mousePosition.y})`);                
    return (
        <Box
            sx={{

            }}
            >
            <Paper
                onMouseOver={e => {
                            setMousePosition({
                                x: e.clientX,
                                y: e.clientY
                            });
                        }}
                ref={viewportRef}
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