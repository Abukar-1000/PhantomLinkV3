import { createTheme } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";


const BackgroundTheme = createTheme({
    palette: {
        mode: "dark",
        secondary: {
            main: deepPurple["A400"]
        },
        background: {
            paper: grey["900"]
        }
    }
})


export default BackgroundTheme;