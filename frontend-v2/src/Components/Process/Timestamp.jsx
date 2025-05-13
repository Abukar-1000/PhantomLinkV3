import { Chip } from "@mui/material";


export default function Timestamp({ timestamp }) {

    return (
        <Chip
            label={timestamp}
            color={"default"}
            variant={"outlined"}
        />
    );
}