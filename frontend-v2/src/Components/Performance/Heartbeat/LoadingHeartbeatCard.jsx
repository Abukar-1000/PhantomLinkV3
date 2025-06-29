import { Box, Paper, Skeleton } from "@mui/material";

import HeartbeatCard from "./HeartbeatCard";


export default function LoadingHeartbeatCard() {
    const metric = "CPU";
    const value = 50;

    return (
        <Box>
            <Paper
                elevation={4}
                sx={{
                    position: "relative",
                    borderRadius: "15px",
                    overflow: "hidden"
                }}
            >
                <Skeleton 
                    variant="rectangular"
                    sx={{
                        position: "absolute",
                        zIndex: 2,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: "300px"
                    }}
                />

                <Box
                    sx={{
                        opacity: "0%"
                    }}
                >
                    <HeartbeatCard metric={metric} value={value} />
                </Box>
            </Paper>
        </Box>
    )
}