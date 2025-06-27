import * as signalR from '@microsoft/signalr';
import { Box, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { config } from '../../Config/config';
import LiveFeed from './LiveFeed';

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
        x: 0,
        y: 0
    })
    
    const [connection, setConnection] = useState(null);

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
                newConnection?.invoke('JoinGroup', deviceId);
                
                const isInitialLoad = mousePosition.x === null && mousePosition.y === null;
                console.log(`MoveTo: (${mousePosition.x}, ${mousePosition.y})`);                
                // newConnection?.invoke("MoveTo", {
                //     x: mousePosition.x,
                //     y: mousePosition.y,
                //     id: deviceId,
                //     viewPortDimensions: {
                //         width: viewportDimensions.width,
                //         height: viewportDimensions.height
                //     }
                // });
                
                if (!isInitialLoad) {
                }
            })
            .catch(err => console.error('Connection failed: ', err));


            setConnection(newConnection);

        return () => {
            newConnection.stop();
        };
    }, [mousePosition.x, mousePosition.y]);

    return (
        <Box
            sx={{

            }}
            >
            <Paper
                onMouseMove={e => {
                    connection?.invoke("MoveTo", {
                        x: e.clientX,
                        y: e.clientY,
                        id: deviceId,
                        viewPortDimensions: {
                            width: viewportDimensions.width,
                            height: viewportDimensions.height
                        }
                    });
                }}
                ref={viewportRef}
                elevation={8}
            >
                <LiveFeed deviceId={deviceId} />
            </Paper>
        </Box>
    );
}