import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import Bills from "../pages/Bills";
import Grocery from "../pages/Grocery";
import Summary from "../pages/Summary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/tasks", element: <Tasks /> },
      { path: "/bills", element: <Bills /> },
      { path: "/grocery", element: <Grocery /> },
      { path: "/summary", element: <Summary /> },
    ],
  },
]);
