import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./AuthProvider";
import MainLayout from "./MainLayout";
import Home from "./Home";
import AllAppointments from "./AllAppointments";
import DoctorDetails from "./DoctorDetails";
import Dashboard from "./Dashboard";
import MyBookings from "./MyBookings";
import MyProfile from "./MyProfile";
import Login from "./Login";
import Register from "./Register";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "appointments", element: <AllAppointments /> },
      { path: "doctor/:id", element: <DoctorDetails /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
          { index: true, element: <MyBookings /> },
          { path: "my-bookings", element: <MyBookings /> },
          { path: "my-profile", element: <MyProfile /> },
        ]
      },
      { path: "*", element: <NotFound /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);