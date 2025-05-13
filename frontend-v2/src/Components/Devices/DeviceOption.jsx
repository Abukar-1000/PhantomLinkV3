import { Box, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router';


export default function DeviceOption({ device }) {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [maxElevation, minElevation] = [24, 2]
    const destination = `device/${device.id}`;

    return (
        <Link
            to={destination}
            style={{
                textDecoration: "none"
            }}
        >
            <Box
                onMouseEnter={e => setIsMouseOver(true)}
                onMouseLeave={e => setIsMouseOver(false)}
            >
                <Paper 
                    elevation={isMouseOver ? maxElevation : minElevation}
                    sx={{
                        padding: "1rem",
                        width: "100%"
                    }}
                >
                    <Stack direction={"column"}>
                        <Typography>Name: {device.name}</Typography>
                        <Typography>Version: {device.version}</Typography>
                        <Typography>Username: {device.username}</Typography>
                        <Typography>ID: {device.id}</Typography>
                    </Stack>
                </Paper>
            </Box>
        </Link>
    );
}