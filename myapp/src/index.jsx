import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/login";
import { ChakraProvider } from "@chakra-ui/react";
import HomeLayout from "./pages/homelayout";
import Profile from "./pages/profile";
import UserManagement from "./pages/usermanagement";
import EmployeeHistory from "./pages/EmployeeDetails";
import ProductManagement from "./pages/ProductManagement";
import CustomerManagement from "./pages/CustomerManagement";
import BillManagement from "./pages/BillManagement";
import PendingBills from "./pages/PendingBills";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path:"/",
        element:<Login/>
      },
      {
        path:"home",
        element:<HomeLayout/>,
        children:[
          {
            path:"profile",
            element:<Profile/>
          },
          {
            path:"usermanagement",
            element:<UserManagement/>
          },
          {
            path: "usermanagement/:id/history", 
            element: <EmployeeHistory />, 
          },
          {
            path:"productmanagement",
            element:<ProductManagement/>
          },
          {
            path:"customermanagement",
            element:<CustomerManagement/>
          },
          {
            path:"billmanagement",
            element:<BillManagement/>
          },
          {
            path:"billmanagement/pendingbill",
            element:<PendingBills/>
          }
        ]
      },
      
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>  
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);