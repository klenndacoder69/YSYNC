import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage_files/Homepage.jsx"
import Login from "./pages/Loginpage_files/Login.jsx";
import Register from "./pages/Registerpage_files/Register.jsx";
// import Connect from "./pages/Connectpage_files/Connectpage.jsx";
// import ConnectPost from "./pages/Connectpage_files/Connectpost.jsx";
import AdminReport from "./pages/Adminreport_files/Adminreport.jsx";

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
      path: "/report",
      element: <AdminReport/>
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
