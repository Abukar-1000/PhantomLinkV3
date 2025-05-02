import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Grid2';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import { useState } from 'react';

const stats = {
    main: [
        "id",
        "name",
        "threadCount",
        "exitCode",
        "exitTime",
        "hasExited"
    ],
    memory: [
        "pagedM",
        "physicalM",
        "systemM",
        "virtualM",
    ],
    processorTime: [
        "user",
        "total",
        "privileged",
    ],

}
export default function Process(props) {
    const [showAllDetails, setShowAllDetails] = useState(false);
    const exitTime = props.metaData?.exitTime;
    return (<>
        <Box 
            key={props?.id || 1}
            maxWidth={"40dvw"}
            onMouseOver={() => setShowAllDetails(true)}
            onMouseLeave={() => setShowAllDetails(false)}
        >
            <Paper 
                elevation={4}
                sx={{
                    padding: "1rem"
                }}
            >
                <Grid2 container spacing={1}>
                    <Grid2 xs={3}>
                        <Typography>{props?.metaData?.name || "UNKNOWN"}</Typography>
                    </Grid2>
                    <Grid2 xs={9}>
                        <Stack  direction="row" spacing={1}>
                            {
                                (props.metaData?.hasExited === null)?
                                    <Chip label="Running" color="success" />:
                                    <Chip label={`Exited: ${exitTime}`} color="warning"/>
                            }
                            <Chip label={`Thread Count: ${props.metaData?.threadCount}`} color="success"/>
                            <Chip label={`Priority: ${props.metaData?.priority}`} color="info" />
                            <Chip label={`Total Time: ${props.metaData?.processorTime?.total || "N/A"}`} color="info" />
                        </Stack>
                    </Grid2>

                    {/* Extensive memory */}
                    <Grid2 xs={6}>
                        <Collapse in={showAllDetails}>
                            <Stack  direction="row" spacing={1}>
                                <Chip />
                            </Stack>
                        </Collapse>
                    </Grid2>

                    {/* Extensive memory */}
                    <Grid2 xs={6}>
                        <Collapse in={showAllDetails}>
                            <Stack  direction="row" spacing={1}>
                                <Chip />
                            </Stack>
                        </Collapse>
                    </Grid2>
                </Grid2>
            </Paper>
        </Box>
    </>);
}