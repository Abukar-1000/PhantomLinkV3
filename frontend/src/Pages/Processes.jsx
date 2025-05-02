
import React, { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { config } from '../Config/config';
import { Box, Stack } from '@mui/material';
import Process from '../Components/Process/Process';

const Processes = () => {
    const [page, setPage] = useState("")
    const [loading, setLoading] = useState(false);
    const [processes, setProcesses] = useState([]);
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(config.socket, {
                withCredentials: true
            })
            .configureLogging(signalR.LogLevel.Information)
            .build();

        newConnection.on("ReceiveTasks", (newProcesses) => {
                setLoading(false);
                setProcesses(newProcesses);
        });

        newConnection.start()
            .then(() => console.log("Connected to SignalR hub"))
            .catch(error => console.error("Error connecting to SignalR hub:", error));

        setConnection(newConnection);
    }, []);

    const sendMessage = (e) => {
        const user = "User"; // Get user from input
        setLoading(true);
        connection.invoke("GetTasks", parseInt(page))
            .catch(error => {
                setLoading(false);
                console.error("Error sending message:", error)
            });
    };

    if (processes.length) {
        console.log(JSON.parse(processes))
        // console.log(JSON.parse(processes[0].message))
    }

    return (
        <div>
            {/* <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.user}</strong>: {message.message}
                    </div>
                ))}
            </div> */}
            {
                (
                    loading && <h1>Loading</h1>
                )
            }
            <input 
                type="text"
                onChange={e => setPage(e?.target?.value)}     
            />
            <button onClick={sendMessage}>Send</button>

            <Stack spacing={2}>
                {
                    (
                        processes.length > 0 && 
                        JSON.parse(processes)
                            .map(data => {
                                return <Process metaData={data}/>
                            })
                    )
                }
            </Stack>
        </div>
    );
};

export default Processes;