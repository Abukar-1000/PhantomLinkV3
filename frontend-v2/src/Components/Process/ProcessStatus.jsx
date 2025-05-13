import { Chip } from "@mui/material";


export default function ProcessStatus({ status }) {
    let color = "success";
    
    if (status == "Dead") {
        color = "error";
    }

    return (
        <Chip
            label={status}
            color={color}
            variant={"outlined"}
        />
    );
}