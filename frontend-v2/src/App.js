import logo from './logo.svg';
import './App.css';
import { Box, ThemeProvider } from '@mui/material';
import DevicePannel from './Components/Devices/DevicePannel';
import { Outlet, RouterProvider } from "react-router";
import Router from './Routes/Routes';
import darkTheme from './Themes/DarkTheme';
import Background from './Components/Background/Background';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Background />
      <Box
        width={"100dvw"}
        height={"100dvh"}
      >
        <RouterProvider router={Router}/>
      </Box>
    </ThemeProvider>
  );
}

export default App;
