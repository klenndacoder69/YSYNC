import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage_files/Homepage.jsx"
import Login from "./pages/Loginpage_files/Login.jsx";
import Register from "./pages/Registerpage_files/Register.jsx";
import Defer from "./pages/Deferpage_files/Defer.jsx";
import Report from "./pages/Reportpage_files/Report.jsx";
import Chat from "./utilities/Chatbox.jsx";
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
      path: "/test",
      element: <Chat/>
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
