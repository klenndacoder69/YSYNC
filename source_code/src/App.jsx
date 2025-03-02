import "./App.css"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage_files/Homepage.jsx"
import Login from "./pages/Loginpage_files/Login.jsx";
import Defer from "./pages/Deferpage_files/Defer.jsx";
import Report from "./pages/Reportpage_files/Report.jsx";
import { Toaster } from 'sonner';
import Unauthorized from "./components/Unauthorized.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import AdminAccountInfo from "./pages/Adminpage_files/acc-info/AdminAccountInfo.jsx";
import AdminRequests from "./pages/Adminpage_files/requests/AdminRequests.jsx";
import AdminReports from "./pages/Adminpage_files/reports/AdminReports.jsx";
import Mentor from "./pages/Mentorpage_files/Mentor.jsx";
import ResMem from "./pages/ResMempage_files/Resmem.jsx";
import TraineeNavBar from "./components/TraineeNavBar.jsx";
import Dashboard from "./pages/Dashboardpage_files/Dashboard.jsx"
import Register from "./pages/Registerpage_files/Register.jsx";
import ResmemNavBar from "./components/ResmemNavbar.jsx";
import Profile from "./pages/AccountMan_files/profile/Profile.jsx";
import Trainee from "./pages/Traineepage_files/Trainee.jsx";
import Migrate from "./pages/Migrate_files/Migrate.jsx";
function App() {
  const routes = [
    {
      path: "/",
      element: <Homepage/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/register",
      element: <Register/>
    },
    {
      path: "/defer",
      element: <Defer/>
    },
    {
      path: "/report",
      element: <Report/>
    },
    {
      path: "/trainee",
      element: <ProtectedRoute element={<TraineeNavBar/>} allowedRoles = {["trainee", "admin"]}/>,
      children: [
      {
        path: "mentors",
        element: <Mentor/>
      },
      {
        path: "residentMembers",
        element: <ResMem/>
      },
      {
        path: "dashboard",
        element: <Dashboard/>
      },
      {
        path: "profile",
        element: <Profile/>
      },
      {
        path: "report",
        element: <Report/>
      },
      {
        path: "defer",
        element: <Defer/>
      }
      ]
    },
    {
      path: "/resmem",
      element: <ProtectedRoute element={<ResmemNavBar/>} allowedRoles = {["residentMember", "admin"]}/>,
      children: [
        {
          path: "dashboard",
          element: <Dashboard/>
        },
        {
          path: "trainees",
          element: <Trainee/>
        },
        {
          path: "residentMembers",
          element: <ResMem/>
        },
        {
          path: "profile",
          element: <Profile/>
        },
        {
          path: "report",
          element: <Report/>
        },
        {
          path: "defer",
          element: <Defer/>
        }
      ]
    },
    {
      path: "/unauthorized",
      element: <Unauthorized/>
    },
    {
      path: "/admin",
      element: <ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} />,
      children: [{
        path: "acc-info",
        element: <AdminAccountInfo/>,
      },
      {
        path: "requests",
        element: <AdminRequests/>,
      },
      {
        path: "reports",
        element: <AdminReports/>
      }
      ]
    },
    {
      path: "/migrate",
      element: <Migrate/>
    }
  ]
  const router = createBrowserRouter(routes)
  return (
    <>
    <Toaster position="top-right" richColors toastOptions={{duration: 1000}}/>
      <RouterProvider router={router} />
    </>
  )
}

export default App
