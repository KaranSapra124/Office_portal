import {
  createBrowserRouter,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import AdminRoot from "./Admin/Pages/AdminRoot";
import Dashboard from "./Admin/Components/Dashboard/AdminLayout";
import Auth from "./Admin/Components/Auth/Auth";
import { Toaster } from "react-hot-toast";
import ClientTable from "./Admin/Components/Client/ClientTable";
import ProjectTable from "./Admin/Components/Projects/ProjectsTable";
import PaymentTable from "./Admin/Components/Payments/PaymentTable";
import ExpenseTable from "./Admin/Components/Expenses/ExpenseTable";
import EmployeeTable from "./Admin/Components/Employee/EmployeeTable";
import TempPage from "./Admin/Pages/TempPage";
("./Admin/Pages/AdminRoot");

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AdminRoot />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/client",
          element: <ClientTable />,
        },
        {
          path: "/projects",
          element: <ProjectTable />,
        },
        {
          path: "/payments",
          element: <PaymentTable />,
        },
        {
          path: "/expenses",
          element: <ExpenseTable />,
        },
        {
          path: "/employees",
          element: <EmployeeTable />,
        },
        
      ],
    },
    {
      path: "/login",
      element: <Auth login={true} />,
    },
  ]);
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
