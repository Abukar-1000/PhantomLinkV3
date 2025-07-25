import * as signalR from '@microsoft/signalr';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import { useEffect, useState } from 'react';
import { config } from '../../Config/config';
import Process from './Process';

export default function ProcessPannel({ group, id }) {
    const [showAllDetails, setShowAllDetails] = useState(false);
    const [connection, setConnection] = useState(null);
    const [processes, setProcesses] = useState({});

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(config.process) 
            .withAutomaticReconnect()
            .build();

            newConnection.start()
            .then(() => {
                console.log('Connected!');
                newConnection.invoke('JoinGroup', group);
                newConnection?.invoke('GetAllProcesses', id);
            })
            .catch(err => console.error('Connection failed: ', err));


            newConnection?.on('ProcessUpdate', (newProcess) => {
                setProcesses(prev => {
                    return {
                        ...prev,
                        [newProcess.processName]: newProcess
                    }
                });
            });

            newConnection?.on('GetAllProcessesResponse', (newProcess) => {
                setProcesses(prev => {
                    return {
                        ...prev,
                        [newProcess.processName]: newProcess
                    }
                });
            });

            setConnection(newConnection);
        return () => {
            newConnection.stop();
        };
    }, []);

    return (<>
        <Box 
            key={id || 1}
            // maxWidth={"40dvw"}
            onMouseOver={() => setShowAllDetails(true)}
            onMouseLeave={() => setShowAllDetails(false)}
        >
            <Paper 
                elevation={4}
                sx={{
                    padding: "1rem",
                    maxHeight: "61dvh",
                    overflowY: "scroll",
                    scrollBehavior: "smooth",
                    "-webkit-scrollbar": "hidden",
                    "-ms-overflow-style": "none",
                    scrollbarWidth: "none"
                }}
            >
                <Grid container spacing={1}>
                    {
                        Object.entries(processes)
                            .map(([key, value]) => {
                                console.log("from map: ", value);
                                return <Grid size={{xs: 12}}>
                                    <Process key={key} process={value}/>
                                </Grid>
                            })
                    }                   
                </Grid>
            </Paper>
        </Box>
    </>);
}