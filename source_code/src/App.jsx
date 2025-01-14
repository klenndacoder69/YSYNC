import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage_files/Homepage.jsx"
import Login from "./pages/Loginpage_files/Login.jsx";
import Register from "./pages/Registerpage_files/Register.jsx";
import Chat from "./utilities/Chatbox.jsx";
import Unauthorized from "./components/Unauthorized.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import AdminAccountInfo from "./pages/Adminpage_files/acc-info/AdminAccountInfo.jsx";
import AdminRequests from "./pages/Adminpage_files/requests/AdminRequests.jsx";
import AdminReports from "./pages/Adminpage_files/reports/AdminReports.jsx";
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
      path: "/test",
      element: <ProtectedRoute element={<Chat/>} allowedRoles = {["trainee", "residentMember", "admin"]}/>
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
