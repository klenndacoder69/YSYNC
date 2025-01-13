import React, { useState, useEffect } from "react";
import './admin-requests.css';

import logo from "C:/Users/lazzz/Desktop/Jpad3/YSYNC_Project_PAD/ysync_plain/assets/logo.png"
import group from "C:/Users/lazzz/Desktop/Jpad3/YSYNC_Project_PAD/ysync_plain/assets/Group_fill.png";
import bell from "C:/Users/lazzz/Desktop/Jpad3/YSYNC_Project_PAD/ysync_plain/assets/Bell_pin.png";
import flag from "C:/Users/lazzz/Desktop/Jpad3/YSYNC_Project_PAD/ysync_plain/assets/flag.png";
import search from "C:/Users/lazzz/Desktop/Jpad3/YSYNC_Project_PAD/ysync_plain/assets/magnifying-glass.png";

const AdminRequests = () => {
  const [typeFlag, setTypeFlag] = useState("application");
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const applications = [
    { name: "John Doe", email: "jdoe@up.edu.ph", applicationForm: "View Form", mentorDate: "2023-05-01" },
    { name: "Ada Lovelace", email: "alovelace@up.edu.ph", applicationForm: "View Form", mentorDate: "2023-06-01" },
    { name: "George Bool", email: "gboole@up.edu.ph", applicationForm: "View Form", mentorDate: "2023-07-01" },
    { name: "Bill Gates", email: "bgates@up.edu.ph", applicationForm: "View Form", mentorDate: "2023-08-01" },
  ];

  const deferrals = [
    { name: "John Doe", email: "jdoe@up.edu.ph", dateSubmitted: "2023-09-01", reason: "Personal reasons" },
    { name: "Ada Lovelace", email: "alovelace@up.edu.ph", dateSubmitted: "2023-09-02", reason: "Health issues" },
    { name: "George Bool", email: "gboole@up.edu.ph", dateSubmitted: "2023-09-03", reason: "Family commitments" },
    { name: "Bill Gates", email: "bgates@up.edu.ph", dateSubmitted: "2023-09-04", reason: "Traveling" },
  ];

  const data = typeFlag === "application" ? applications : deferrals;

  useEffect(() => {
    setFilteredData(data);
  }, [typeFlag]);

  useEffect(() => {
    setFilteredData(
      data.filter((item) => item.name.toLowerCase().includes(searchInput.toLowerCase()))
    );
  }, [searchInput, data]);

  const handleTabSwitch = (type) => {
    setTypeFlag(type);
  };

  const renderTableHeader = () => {
    if (typeFlag === "application") {
      return (
        <tr>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>APPLICATION FORM</th>
          <th>ACTION</th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>DATE SUBMITTED</th>
          <th>REASON</th>
          <th>ACTION</th>
        </tr>
      );
    }
  };

  const renderTableRows = () => {
    return filteredData.map((item, index) => (
      <tr key={index}>
        <td>
          <div className="table-align-picture">
            <div className="circle" />
            {item.name}
          </div>
        </td>
        <td>{item.email}</td>
        {typeFlag === "application" ? (
          <>
            <td>
              <a href="#" target="_blank" rel="noopener noreferrer">
                {item.applicationForm}
              </a>
            </td>
            <td>
              <div className="button-div">
                <button className="accept-btn">Accept</button>
                <button className="decline-btn">Decline</button>
              </div>
            </td>
          </>
        ) : (
          <>
            <td>{item.dateSubmitted}</td>
            <td>{item.reason}</td>
            <td>
              <div className="button-div">
                <button className="accept-btn">Accept</button>
                <button className="decline-btn">Decline</button>
              </div>
            </td>
          </>
        )}
      </tr>
    ));
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo">
          <a href="#">
            <img
              className="logo-img"
              src={logo}
              alt="YSYNC Logo"
            />
          </a>
          <h2>YSYNC</h2>
        </div>
        <nav className="menu">
          <div className="menu-container">
            <img
              className="menu-img"
              src={group}
              alt="Account Information"
            />
            <a href="#" className="menu-item">
              Account Information
            </a>
            <br />
          </div>
          <div className="menu-container active">
            <img
              className="menu-img"
              src={bell}
              alt="Requests"
            />
            <a href="#" className="menu-item">
              Requests
            </a>
            <br />
          </div>
          <div className="menu-container">
            <img
              className="menu-img"
              src={flag}
              alt="Reports"
            />
            <a href="#" className="menu-item">
              Reports
            </a>
          </div>
        </nav>
        <div className="admin-account">
          <p>ADMIN ACCOUNT</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>
            <span className="header-main-title">Requests</span>{" "}
            <span className="header-main-secondary">
              {typeFlag === "application" ? "/ Application" : "/ Deferral"}
            </span>
          </h1>
        </header>

        <div className="table-content">
          <div className="search-bar">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search"
                value={searchInput}
                id="search-input"
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="button">
                <img
                  className="search-img"
                  src={search}
                  alt="Search"
                />
              </button>
            </div>
          </div>

          <div className="tabs">
            <button
              className={`tab ${typeFlag === "application" ? "active" : ""}`}
              onClick={() => handleTabSwitch("application")}
            >
              Application
            </button>
            <button
              className={`tab ${typeFlag === "deferral" ? "active" : ""}`}
              onClick={() => handleTabSwitch("deferral")}
            >
              Deferral
            </button>
          </div>

          <table className="account-table">
            <thead>{renderTableHeader()}</thead>
            <tbody>{renderTableRows()}</tbody>
          </table>

        </div>
      </main>
    </div>
  );
};

export default AdminRequests;