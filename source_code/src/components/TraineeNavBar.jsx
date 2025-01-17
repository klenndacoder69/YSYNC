import { Link, Outlet, useNavigate } from "react-router-dom";
import "./TraineeNavBar.css";
import { useState } from "react";


function TraineeNavBar(){
    const [activeMenu, setActiveMenu] = useState("dashboard");

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [residentMembers, setResidentMembers] = useState([]);

    return(
     <div className="container-traineee-navbar">
        <div className="parentNav-traineee-navbar">
        <div className="logoname-traineee-navbar">
          <img src="" alt="YSES Logo" className="traineee-navbar-logo" />
          <div className="navi-traineee-navbar">YSYNC</div>
        </div>
        <nav className="navButtons-traineee-navbar">
          <div 
            className={`button-traineee-navbar ${
              activeMenu === "dashboard" ? "active" : ""
            }`}
            onClick={() => {setActiveMenu("dashboard")}}
            >
            <Link
              to="dashboard"
              className={`button-traineee-navbar-dashboard ${
                activeMenu === "acc-info" ? "active" : ""
              }`}
            >
              Dashboard
            </Link>
            </div>
          <div className={`button-traineee-navbar ${
              activeMenu === "mentors" ? "active" : ""
            }`}
            onClick={() => {setActiveMenu("mentors")}}
            >
            <Link
              to="mentors"
              className={`button-traineee-navbar-dashboard ${
                activeMenu === "acc-info" ? "active" : ""
              }`}
            >
              Mentors
            </Link></div>
          <div className={`button-traineee-navbar ${
              activeMenu === "resmem" ? "active" : ""
            }`}
            onClick={() => {setActiveMenu("resmem")}}
            >
            <Link
              to="residentMembers"
              className={`button-traineee-navbar-dashboard ${
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
            className="profile-button-traineee-navbar"
            >
            <img src="./assets/profile.jpg" alt="profile pic" className="profile-traineee-navbar" />

        </button>
      </div>
      <div className={`acc-parentNav-traineee-navbar ${dropdownVisible ? "visible" : "hidden"}`}>
            <a href="#">Profile</a>
            <a href="#">Report</a>
            <a href="#">Defer</a>
            <a href="#">Log Out</a>
        </div>
        <Outlet/>
     </div>
        
    );


}

export default TraineeNavBar;