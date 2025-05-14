import { Button, Grid, Paper, Typography } from "@mui/material";
import ProcessStatus from "./ProcessStatus";
import Timestamp from "./Timestamp";
import * as signalR from '@microsoft/signalr';
import { useEffect, useState } from "react";
import { config } from "../../Config/config";


export default function Process({ process }) {
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
            })
            .catch(err => console.error('Connection failed: ', err));

            newConnection.on('ProcessUpdate', (status) => {
                console.log("process: ", status);
            });
            
            newConnection.on('ProcessUpdate', (newProcess) => {
                console.log("process: ", newProcess);
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

    const SendKillRequest = async () => {
        const payload = {
            deviceID: process.deviceID,
            processName: process.processName
        };

        console.log("sending request", payload);
        await connection?.invoke(
            'KillProcessRequest',
            payload
        );
    }
    return (
        <Paper
            elevation={1}
            sx={{
                padding: "0.5rem"
            }}
        >
            <Grid container>
                <Grid 
                    size={{ xs: 3}}
                    overflow={"hidden"}
                >
                    <Typography fontFamily={"monospace"} fontSize={"13px"}>{process.processName}</Typography>
                </Grid>

                <Grid 
                    size={{ xs: 3}}
                    display={"flex"}
                    justifyContent={"center"}
                    alignContent={"center"}
                >
                    <ProcessStatus status={process.status}/>                
                </Grid>

                <Grid size={{ xs: 3}}>
                    <Timestamp timestamp={process.timestamp} />
                </Grid>

                <Grid 
                    size={{ xs: 3}}
                    display={"flex"}
                    justifyContent={"center"}
                    alignContent={"center"}
                >
                    <Button
                        color="error"
                        variant="contained"
                        onClick={SendKillRequest}
                    >
                        Kill
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}