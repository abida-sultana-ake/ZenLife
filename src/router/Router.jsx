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
    element: (
      <MainLayout>
        <Dashboard />
      </MainLayout>
    ),
  },
  {
    path: "/tasks",
    element: (
      <MainLayout>
        <Tasks />
      </MainLayout>
    ),
  },
  {
    path: "/bills",
    element: (
      <MainLayout>
        <Bills />
      </MainLayout>
    ),
  },
  {
    path: "/grocery",
    element: (
      <MainLayout>
        <Grocery />
      </MainLayout>
    ),
  },
  {
    path: "/summary",
    element: (
      <MainLayout>
        <Summary />
      </MainLayout>
    ),
  },
]);
