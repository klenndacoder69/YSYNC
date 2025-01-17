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
      <Table values={residentMembers}/> 
      <Outlet/>
    </div>
    
  );
}

export default ResMem;
