
import React, { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { config } from '../Config/config';
import { Box, Stack } from '@mui/material';
import Process from '../Components/Process/Process';

const Chat = () => {
    const [myMessage, setMyMessage] = useState("")
    const [messages, setMessages] = useState([]);
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(config.socket, {
                withCredentials: true
            })
            .configureLogging(signalR.LogLevel.Information)
            .build();

        newConnection.on("ReceiveMessage", (user, message) => {
            setMessages([...messages, { user, message }]);
        });

        newConnection.start()
            .then(() => console.log("Connected to SignalR hub"))
            .catch(error => console.error("Error connecting to SignalR hub:", error));

        setConnection(newConnection);
    }, []);

    const sendMessage = (e) => {
        const user = "User"; // Get user from input
        connection.invoke("SendMessage", user, myMessage)
            .catch(error => console.error("Error sending message:", error));
    };

    if (messages.length) {
        console.log(JSON.parse(messages[0].message))
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
            <input 
                type="text"
                onChange={e => setMyMessage(e?.target?.value)}     
            />
            <button onClick={sendMessage}>Send</button>

            <Stack spacing={2}>
                {
                    (
                        messages.length > 0 && 
                        JSON.parse(messages[0].message)
                            .map(data => {
                                // console.log("metaData", )
                                return <Process metaData={data}/>
                            })
                    )
                }
            </Stack>
        </div>
    );
};

export default Chat;