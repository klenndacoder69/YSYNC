import { Link, Outlet, useNavigate } from "react-router-dom";
import "./ResmemNavbar.css";
import { useEffect, useState } from "react";

function ResmemNavBar() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  useEffect(() => {
    navigate(`/resmem/${activeMenu}`);
  }, [])
  return (
    <div className="container-resmem-navbar">
      <div className="parentNav-resmem-navbar">
        <div className="logoname-resmem-navbar">
          <img
            src="/assets/YSYNC.png"
            alt="YSES Logo"
            className="resmem-navbar-logo"
          />
        </div>
        <nav className="navButtons-resmem-navbar">
          <div
            className={`button-resmem-navbar ${
              activeMenu === "dashboard" ? "active" : ""
            }`}
            onClick={() => {
              setActiveMenu("dashboard");
            }}
          >
            <Link
              to="dashboard"
              className={`button-resmem-navbar-dashboard ${
                activeMenu === "acc-info" ? "active" : ""
              }`}
            >
              Dashboard
            </Link>
          </div>
          <div
            className={`button-resmem-navbar ${
              activeMenu === "mentors" ? "active" : ""
            }`}
            onClick={() => {
              setActiveMenu("mentors");
            }}
          >
            <Link
              to="trainees"
              className={`button-resmem-navbar-dashboard ${
                activeMenu === "acc-info" ? "active" : ""
              }`}
            >
              Trainees
            </Link>
          </div>
          <div
            className={`button-resmem-navbar ${
              activeMenu === "resmem" ? "active" : ""
            }`}
            onClick={() => {
              setActiveMenu("resmem");
            }}
          >
            <Link
              to="residentMembers"
              className={`button-resmem-navbar-dashboard ${
                activeMenu === "acc-info" ? "active" : ""
              }`}
            >
              Resident Members
            </Link>
          </div>
        </nav>
        <button
          onClick={() => {
            console.log("Dropdown visible before toggle:", dropdownVisible);
            setDropdownVisible(!dropdownVisible);
            console.log("Dropdown visible after toggle:", !dropdownVisible);
          }}
          className="profile-button-resmem-navbar"
        >
          <img
            src="/assets/profile.jpg"
            alt="profile pic"
            className="profile-resmem-navbar"
          />
        </button>
      </div>
      <div
        className={`acc-parentNav-resmem-navbar ${
          dropdownVisible ? "visible" : "hidden"
        }`}
      >
        <a href="#">Profile</a>
        <a href="#">Report</a>
        <a href="#">Defer</a>
        <a href="#">Log Out</a>
      </div>
      <Outlet />
    </div>
  );
}

export default ResmemNavBar;
