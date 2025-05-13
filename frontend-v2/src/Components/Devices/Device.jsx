import { Box, Paper, Stack, Typography } from '@mui/material';
import { useParams } from "react-router";
import ProcessPannel from '../Process/ProcessPannel';

export default function Device({ device }) {
    const { id } = useParams();
    return (
        <Box>
            <Paper 
                elevation={4}
                sx={{
                    padding: "1rem",
                    width: "100%"
                }}
            >
                <h1>Id: {id}</h1>
                <Box>
                    <ProcessPannel group={id} id={id} />
                </Box>
            </Paper>
        </Box>
    );
}