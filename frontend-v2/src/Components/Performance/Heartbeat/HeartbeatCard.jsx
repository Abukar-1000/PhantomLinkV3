import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import CPUIcon from "../../Icons/CPUIcon";
import GPUIcon from "../../Icons/GPUIcon";
import RamIcon from "../../Icons/RamIcon";
import useMapThemeColor from "../../Icons/useMapThemeColor";


export default function HeartbeatCard({ value, metric }) {
    const color = useMapThemeColor("success");
    const size = "large";


    return (
        <Box>
            <Paper
                elevation={4}
                sx={{
                    padding: "1rem",
                    width: "inherit",
                    height: "inherit",
                    borderRadius: "20px",
                    position: "relative" 
                }}
            >
                <CircularProgress
                    variant="determinate"
                    value={value}
                    color="success"
                    size={100}
                    thickness={1}
                />
                
                <Box
                    sx={{
                        position: "absolute",
                        top: 40,
                        left: 50
                    }}
                >
                    <Stack
                        gap={1}
                        display={"flex"}
                        justifyContent={"center"}
                        alignContent={"center"}
                    >
                        {
                            metric === "CPU" ?
                                <CPUIcon color={color} fontSize={size}/> :
                            metric === "GPU" ?
                                <GPUIcon color={color} fontSize={size}/> :
                            metric === "Ram" ?
                                <RamIcon color={color} fontSize={size}/> :
                                <></>
                        }
                        <Typography
                            variant={"caption"}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                            }}
                        >
                            {value}%
                        </Typography>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    )
}