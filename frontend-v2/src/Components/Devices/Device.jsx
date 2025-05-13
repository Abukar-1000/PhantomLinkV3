import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { useParams } from "react-router";
import ProcessPannel from '../Process/ProcessPannel';

export default function Device({ device }) {
    const { id } = useParams();
    return (
        <Box
            sx={{
                paddingTop: "1rem"
            }}
        >
            <Grid container>
                <Grid size={{ xs: 2}}>

                </Grid>

                <Grid size={{ xs: 6}}>

                </Grid>

                <Grid size={{ xs: 4}}>
                    <ProcessPannel group={id} id={id} />
                </Grid>
                
            </Grid>
        </Box>
    );
}