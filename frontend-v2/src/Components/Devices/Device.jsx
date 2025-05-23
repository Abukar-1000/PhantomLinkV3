import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { useParams } from "react-router";
import ProcessPannel from '../Process/ProcessPannel';
import Display from '../Display/Display';

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
                    <ProcessPannel group={id} id={id} />
                </Grid>
                
            </Grid>
        </Box>
    );
}