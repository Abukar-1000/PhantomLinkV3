import { createTheme } from "@mui/material";
import { deepPurple, green, grey, pink, purple } from "@mui/material/colors";


const darkTheme = createTheme({
    palette: {
        mode: "dark",
        secondary: {
            main: deepPurple["A400"]
        },
        success: {
            main: green["A400"]
        },
        error: {
            main: pink["A400"]
        },
    }
})


export default darkTheme;