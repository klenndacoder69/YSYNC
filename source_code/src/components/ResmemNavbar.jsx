import { Link, Outlet, useNavigate } from "react-router-dom";
import "./ResmemNavBar.css";
import { useEffect, useState, useRef } from "react";

function ResmemNavBar() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [indicatorPosition, setIndicatorPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const navButtonsRef = useRef({});

  useEffect(() => {
    navigate(`/resmem/${activeMenu}`);
  }, []);

  useEffect(() => {
    updateIndicatorPosition(activeMenu);
  }, [activeMenu]);

  const updateIndicatorPosition = (menu) => {
    if (navButtonsRef.current[menu]) {
      const button = navButtonsRef.current[menu];
      const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = button;
      setIndicatorPosition({
        top: offsetTop,
        left: offsetLeft,
        width: offsetWidth,
        height: offsetHeight,
      });
    }
  };

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
            className="active-indicator-resmem-navbar"
            style={{
              top: `${indicatorPosition.top}px`,
              left: `${indicatorPosition.left}px`,
              width: `${indicatorPosition.width}px`,
              height: `${indicatorPosition.height}px`,
            }}
          />
          <Link
            to="dashboard"
            className="button-resmem-navbar"
            onClick={() => {
              setActiveMenu("dashboard");
            }}
            ref={(element) => (navButtonsRef.current["dashboard"] = element)}
          >
            <span className="button-resmem-navbar-content">Dashboard</span>
          </Link>
          <Link
            to="trainees"
            className="button-resmem-navbar"
            onClick={() => {
              setActiveMenu("trainees");
            }}
            ref={(element) => (navButtonsRef.current["trainees"] = element)}
          >
            <span className="button-resmem-navbar-content">Trainees</span>
          </Link>
          <Link
            to="residentMembers"
            className="button-resmem-navbar"
            onClick={() => {
              setActiveMenu("resmem");
            }}
            ref={(element) => (navButtonsRef.current["resmem"] = element)}
          >
            <span className="button-resmem-navbar-content">
              Resident Members
            </span>
          </Link>
        </nav>
        <button
          onClick={() => setDropdownVisible(!dropdownVisible)}
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
        <Link to="profile">Profile</Link>
        <Link to="report">Report</Link>
        <Link to="defer">Defer</Link>
        <a href="#">Log Out</a>
      </div>
      <Outlet />
    </div>
  );
}

export default ResmemNavBar;
