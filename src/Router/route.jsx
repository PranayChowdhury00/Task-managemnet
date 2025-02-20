import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/loginSignIn/Login";
import Register from "../pages/loginSignIn/Register";
import TaskBoard from "../Components/TaskBoard";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
            path:'/taskBoard',
            element:<TaskBoard></TaskBoard>
        }
      ]
    },
  ]);

export default router;