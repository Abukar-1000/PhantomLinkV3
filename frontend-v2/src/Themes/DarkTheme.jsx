import { createTheme } from "@mui/material";
import { deepPurple, grey, pink, purple } from "@mui/material/colors";


const darkTheme = createTheme({
    palette: {
        mode: "dark",
        secondary: {
            main: deepPurple["A400"]
        }
    }
})


export default darkTheme;