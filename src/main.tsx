import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./component/Login.tsx";
import AdminDashboard from "./component/AdminDashboard/index.tsx";
import UserDetails from "./component/UserDetails/index.tsx";
import AdminProducts from "./component/AdminProducts/index.tsx";
import UserDashBoard from "./component/UserDashBoard/index.tsx";
import ForgetPassword from "./component/ForgetPassword/ForgetPassword.tsx";
import ForgetPasswordmsg from "./component/ForgetPassword/ForgetPasswordmsg.tsx";
import ForgtPasswordSet from "./component/ForgetPassword/ForgtPasswordSet.tsx";
import ForgetPasswordSuccess from "./component/ForgetPassword/ForgetPasswordSuccess.tsx";
import AddContent from "./component/AddContent/index.tsx";
import AdminProfile from "./component/AdminProfile/index.tsx";
import ChangePassword from "./component/AdminChangePassword/index.tsx";
import AdminChangePassword from "./component/AdminChangePassword/index.tsx";
import Commonnavbar from "./component/common/Commonnavbar.tsx";
import LoginVerifyOtp from "./component/LoginVerifyOtp.tsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "ChangePassword",
    element: <ChangePassword />,
  },
  {
    path: "ForgetPassword",
    element: <ForgetPassword />,
  },
  {
    path: "ForgetPassword/ForgetPasswordmsg",
    element: <ForgetPasswordmsg />,
  },
  {
    path: "ForgtPasswordSet",
    element: <ForgtPasswordSet />,
  },
  {
    path: "ForgtPasswordSet/ForgetPasswordSuccess",
    element: <ForgetPasswordSuccess />,
  },
  {
    path: "LoginVerifyOtp",
    element: <LoginVerifyOtp />,
  },
  {
    path: "/",
    element: <Commonnavbar />,
    children: [
      {
        path: "/AdminDashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/UserDashBoard",
        element: <UserDashBoard />,
      },
      {
        path: "/UserDetails",
        element: <UserDetails />,
      },
      {
        path: "/AdminProducts",
        element: <AdminProducts />,
      },

      {
        path: "/AddContent",
        element: <AddContent />,
      },
      {
        path: "/AdminProfile",
        element: <AdminProfile />,
      },
      {
        path: "/AdminChangePassword",
        element: <AdminChangePassword />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
