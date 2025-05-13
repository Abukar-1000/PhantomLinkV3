import { createBrowserRouter } from "react-router";
import DevicePannel from "../Components/Devices/DevicePannel";
import Device from "../Components/Devices/Device";



const Router = createBrowserRouter([
  {
    path: "/", 
    Component: DevicePannel 
  },
  {
    path: "/device/:id", 
    Component: Device 
  },
]);

export default Router;