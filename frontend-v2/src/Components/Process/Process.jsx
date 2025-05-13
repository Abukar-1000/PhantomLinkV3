import { Grid, Paper, Typography } from "@mui/material";
import ProcessStatus from "./ProcessStatus";
import Timestamp from "./Timestamp";


export default function Process({ process }) {

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

                <Grid size={{ xs: 3}}>
                
                </Grid>
            </Grid>
        </Paper>
    );
}