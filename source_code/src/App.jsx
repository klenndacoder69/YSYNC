import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage_files/Homepage.jsx"
import Login from "./pages/Loginpage_files/Login.jsx";
import Register from "./pages/Registerpage_files/Register.jsx";
// import Connect from "./pages/Connectpage_files/Connectpage.jsx";
// import ConnectPost from "./pages/Connectpage_files/Connectpost.jsx";
import Defer from "./pages/Deferpage_files/Defer.jsx";
import Report from "./pages/Reportpage_files/Report.jsx";
import Chat from "./utilities/Chatbox.jsx";
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
    // {
    //   path: "/connect",
    //   element: <Connect/>
    // },
    // {
    //   path: "/connect-post",
    //   element: <ConnectPost/>
    // }
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
      element: <ProtectedRoute element={<ResMem/>} allowedRoles = {["trainee", "admin"]}/>,
      children: [{
        path: "residents",
        element: <Chat/>,
      }
      ]
    },
    {
      path: "/resmem",
      element: <ProtectedRoute element={<Chat/>} allowedRoles = {["residentMember", "admin"]}/>
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
      path: "/Mentor",
      element: <Mentor/>
    },
    {
      path: "/trainee-navbar",
      element: <TraineeNavBar/>
    },
    {
      path: "/dashboard",
      element: <Dashboard/>
    }
  ]
  const router = createBrowserRouter(routes)
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
