import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { useState } from "react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/").pop();
  const [activeMenu, setActiveMenu] = useState(`${pathname}`);
  const navigate = useNavigate();
  return (
    <div className="container-admin-dashboard">
      <aside className="sidebar-admin-dashboard">
        <div className="logo-admin-dashboard">
          <img src="/assets/YSYNC.png" className="logo-image-admin-dashboard" alt="Logo" />
        </div>
        <nav className="menu-admin-dashboard">
          <div
            className={`menu-container-admin-dashboard ${
              activeMenu === "acc-info" ? "active" : ""
            }`}
            onClick={() => {setActiveMenu("acc-info"); navigate("acc-info")}}
          >
            <img
              className={`menu-img-admin-dashboard ${
                activeMenu === "acc-info" ? "active" : ""
              }`}
              src="/assets/Group_fill.png"
              alt="Account Information Icon"
            />
            <Link
              to="acc-info"
              className={`menu-item-admin-dashboard ${
                activeMenu === "acc-info" ? "active" : ""
              }`}
            >
              Account Information
            </Link>
          </div>
          <div
            className={`menu-container-admin-dashboard ${
              activeMenu === "requests" ? "active" : ""
            }`}
            onClick={() =>  {setActiveMenu("requests"); navigate("requests")}}
          >
            <img
              className={`menu-img-admin-dashboard ${
                activeMenu === "requests" ? "active" : ""
              }`}
              src="/assets/Bell_pin.png"
              alt="Requests Icon"
            />
            <Link
              to="requests"
              className={`menu-item-admin-dashboard ${
                activeMenu === "requests" ? "active" : ""
              }`}
            >
              Requests
            </Link>
          </div>
          <div
            className={`menu-container-admin-dashboard ${
              activeMenu === "reports" ? "active" : ""
            }`}
            onClick={() => {setActiveMenu("reports"); navigate("reports")}}
          >
            <img
              className={`menu-img-admin-dashboard ${
                activeMenu === "reports" ? "active" : ""
              }`}
              src="/assets/Flag.png"
              alt="Reports Icon"
            />
            <Link
              to="reports"
              className={`menu-item-admin-dashboard ${
                activeMenu === "reports" ? "active" : ""
              }`}
            >
              Reports
            </Link>
          </div>
        </nav>
        <div className="admin-account">
        <Link onClick={() => {
          sessionStorage.clear()
          toast.success("Logout successful!")
          navigate("/")
        }}>Logout</Link>
          <p>ADMIN ACCOUNT</p>
        </div>
      </aside>

      <Outlet />
    </div>
  );
};

export default AdminDashboard;
