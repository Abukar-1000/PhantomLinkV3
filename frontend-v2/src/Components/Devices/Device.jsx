import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { useParams } from "react-router";
import ProcessPannel from '../Process/ProcessPannel';
import Display from '../Display/Display';
import Heartbeat from '../Performance/Heartbeat/Heartbeat';

export default function Device({ device }) {
    const { id } = useParams();
    return (
        <Box
            sx={{
                paddingTop: "1rem"
            }}
        >
            <Grid container spacing={{ xs: 2 }}>
                <Grid size={{ xs: 1}}>

                </Grid>

                <Grid size={{ xs: 7}}>
                    <Display deviceId={id} />
                </Grid>

                <Grid size={{ xs: 4}}>
                    <Stack
                        gap={3}
                    >
                        <Heartbeat deviceId={id}/>
                        <ProcessPannel group={id} id={id} />
                    </Stack>
                </Grid>
                
            </Grid>
        </Box>
    );
}