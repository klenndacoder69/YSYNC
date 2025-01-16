import React, { useState, useEffect } from "react";
import "./Resmem.css";
import Table from "./Table.jsx";
import api from "../../api/axios.js";
import { Outlet } from "react-router-dom";
function ResMem() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [residentMembers, setResidentMembers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/getAllResidentMembers");
      if(response) {
        setResidentMembers(response.data);
      }
    } catch (error) {
      if(error.response) {
        console.log("Error response status: ", error.response.status);
      }
    }
  }
  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <div className="body-resmem">
        <div className="resmem-body">
      <div className="parentNav-resmem">
        <div className="logoname-resmem">
          <img src="" alt="YSES Logo" className="resmem-logo-resmem" />
          <div className="navi-resmem">YSYNC</div>
        </div>
        <ul className="navButtons-resmem">
          <li className="button-resmem"><a href="">Dashboard</a></li>
          <li className="button-resmem"><a href="">Mentors</a></li>
          <li className="navActive-resmem button"><a href="">Resident Members</a></li>
        </ul>
        <button
            onClick={() => {
                console.log("Dropdown visible before toggle:", dropdownVisible);
                setDropdownVisible(!dropdownVisible);
                console.log("Dropdown visible after toggle:", !dropdownVisible);
            }}
            className="profile-button-resmem"
            >
            <img src="./assets/profile.jpg" alt="profile pic" className="profile" />

        </button>
      </div>
      <div className={`acc-parentNav-resmem ${dropdownVisible ? "visible" : "hidden"}`}>
            <a href="#">Profile</a>
            <a href="#">Report</a>
            <a href="#">Defer</a>
            <a href="#">Log Out</a>
        </div>

      {/* <Table values={residentMembers}/> */}
      <Outlet/>
    </div>
    </div>
    
  );
}

export default ResMem;
