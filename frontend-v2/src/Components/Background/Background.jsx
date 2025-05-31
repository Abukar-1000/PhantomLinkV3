import { Paper } from "@mui/material";



export default function Background({ mode = "dark" }) {

    return (
        <Paper
            sx={{
                width: "100dvw",
                height: "100dvh",
                position: "absolute",
                zIndex: -1,
                borderRadius: "0px"
            }}
        >

        </Paper>
    );
}