import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage_files/Homepage.jsx"
import Login from "./pages/Loginpage_files/Login.jsx";
import Register from "./pages/Registerpage_files/Register.jsx";
import Chat from "./utilities/Chatbox.jsx";
import Unauthorized from "./components/Unauthorized.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
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
