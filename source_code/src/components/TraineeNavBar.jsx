import { Link, Outlet, useNavigate } from "react-router-dom";
import "./TraineeNavBar.css";
import { useEffect, useState, useRef } from "react";

function TraineeNavBar() {
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
        navigate(`/trainee/${activeMenu}`);
    }, [])
    useEffect(() => {
        updateIndicatorPosition(activeMenu)
    }, [activeMenu]);

    const updateIndicatorPosition = (menu) => {
        if(navButtonsRef.current[menu]){
            const button = navButtonsRef.current[menu];
            const { offsetTop, offsetLeft, offsetWidth, offsetHeight} = button;
            setIndicatorPosition({
                top: offsetTop,
                left: offsetLeft,
                width: offsetWidth,
                height: offsetHeight
            })
        }
    }
  return (
    <div className="container-traineee-navbar">
      <div className="parentNav-traineee-navbar">
        <div className="logoname-traineee-navbar">
          <img
            src="/assets/YSYNC.png"
            alt="YSES Logo"
            className="traineee-navbar-logo"
          />
        </div>
        <nav className="navButtons-traineee-navbar">
             <div
                className="active-indicator-trainee-navbar"
                style={{
                  top: `${indicatorPosition.top}px`,
                  left: `${indicatorPosition.left}px`,
                  width: `${indicatorPosition.width}px`,
                  height: `${indicatorPosition.height}px`,
                }}
            />
          <Link
            to="dashboard"
            className={`button-traineee-navbar`}
            onClick={() => {
                setActiveMenu("dashboard");
             }}
             ref={(element) => (navButtonsRef.current['dashboard'] = element)}
          >
            <span className="button-traineee-navbar-content">Dashboard</span>
          </Link>
          <Link
            to="mentors"
            className={`button-traineee-navbar`}
             onClick={() => {
                 setActiveMenu("mentors");
            }}
             ref={(element) => (navButtonsRef.current['mentors'] = element)}
          >
            <span className="button-traineee-navbar-content">Mentors</span>
          </Link>
          <Link
            to="residentMembers"
            className={`button-traineee-navbar`}
             onClick={() => {
                setActiveMenu("resmem");
            }}
            ref={(element) => (navButtonsRef.current['resmem'] = element)}
          >
            <span className="button-traineee-navbar-content">
              Resident Members
            </span>
          </Link>
        </nav>
        <button
          onClick={() => {
            console.log("Dropdown visible before toggle:", dropdownVisible);
            setDropdownVisible(!dropdownVisible);
            console.log("Dropdown visible after toggle:", !dropdownVisible);
          }}
          className="profile-button-traineee-navbar"
        >
          <img
            src="/assets/profile.jpg"
            alt="profile pic"
            className="profile-traineee-navbar"
          />
        </button>
      </div>
      <div
        className={`acc-parentNav-traineee-navbar ${
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

export default TraineeNavBar;