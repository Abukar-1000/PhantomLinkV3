import logo from './logo.svg';
import './App.css';
import { Box } from '@mui/material';
import DevicePannel from './Components/Devices/DevicePannel';
import { Outlet, RouterProvider } from "react-router";
import Router from './Routes/Routes';

function App() {
  return (
    <Box
      width={"100dvw"}
      height={"100dvh"}
    >
      <RouterProvider router={Router}/>
    </Box>
  );
}

export default App;
