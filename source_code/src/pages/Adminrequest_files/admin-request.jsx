import React, { useState, useEffect } from "react";
import './admin-request.css';

import logo from "./assets/logo.png";
import group from "./assets/Group_fill.png";
import bell from "./assets/Bell_pin.png";
import flag from "./assets/flag.png";
import search from "./assets/magnifying-glass.png";

const AdminRequests = () => {
  const [typeFlag, setTypeFlag] = useState("application");
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const applications = [
    {
      name: "John Doe",
      email: "jdoe@up.edu.ph",
      applicationForm: "View Form",
      mentorDate: "2023-05-01",
    },
    {
      name: "Ada Lovelace",
      email: "alovelace@up.edu.ph",
      applicationForm: "View Form",
      mentorDate: "2023-06-01",
    },
    {
      name: "George Bool",
      email: "gboole@up.edu.ph",
      applicationForm: "View Form",
      mentorDate: "2023-07-01",
    },
    {
      name: "Bill Gates",
      email: "bgates@up.edu.ph",
      applicationForm: "View Form",
      mentorDate: "2023-08-01",
    },
  ];

  const deferrals = [
    {
      name: "John Doe",
      email: "jdoe@up.edu.ph",
      dateSubmitted: "2023-09-01",
      reason: "Personal reasons",
    },
    {
      name: "Ada Lovelace",
      email: "alovelace@up.edu.ph",
      dateSubmitted: "2023-09-02",
      reason: "Health issues",
    },
    {
      name: "George Bool",
      email: "gboole@up.edu.ph",
      dateSubmitted: "2023-09-03",
      reason: "Family commitments",
    },
    {
      name: "Bill Gates",
      email: "bgates@up.edu.ph",
      dateSubmitted: "2023-09-04",
      reason: "Traveling",
    },
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
          <div className="admin-request-table-align-picture">
            <div className="admin-request-circle" />
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
              <div className="admin-request-button-div">
                <button className="admin-request-accept-btn">Accept</button>
                <button className="admin-request-decline-btn">Decline</button>
              </div>
            </td>
          </>
        ) : (
          <>
            <td>{item.dateSubmitted}</td>
            <td>{item.reason}</td>
            <td>
              <div className="admin-request-button-div">
                <button className="admin-request-accept-btn">Accept</button>
                <button className="admin-request-decline-btn">Decline</button>
              </div>
            </td>
          </>
        )}
      </tr>
    ));
  };

  return (
    <div className="admin-request-main">
      <div className="admin-request-container">
        <aside className="admin-request-sidebar">
          <div className="admin-request-logo">
            <a href="#">
              <img
                className="admin-request-logo-img"
                src={logo}
                alt="YSYNC Logo"
              />
            </a>
            <h2>YSYNC</h2>
          </div>
          <nav className="admin-request-menu">
            <div className="admin-request-menu-container">
              <img
                className="admin-request-menu-img"
                src={group}
                alt="Account Information"
              />
              <a href="#" className="admin-request-menu-item">
                Account Information
              </a>
              <br />
            </div>
            <div className="admin-request-menu-container active">
              <img
                className="admin-request-menu-img"
                src={bell}
                alt="Requests"
              />
              <a href="#" className="admin-request-menu-item">
                Requests
              </a>
              <br />
            </div>
            <div className="admin-request-menu-container">
              <img
                className="admin-request-menu-img"
                src={flag}
                alt="Reports"
              />
              <a href="#" className="admin-request-menu-item">
                Reports
              </a>
            </div>
          </nav>
          <div className="admin-request-admin-account">
            <p>ADMIN ACCOUNT</p>
          </div>
        </aside>

        <main className="admin-request-main-content">
          <header className="admin-request-header">
            <h1>
              <span className="admin-request-header-main-title">Requests</span>{" "}
              <span className="admin-request-header-main-secondary">
                {typeFlag === "application" ? "/ Application" : "/ Deferral"}
              </span>
            </h1>
          </header>

          <div className="admin-request-table-content">
            <div className="admin-request-search-bar">
              <div className="admin-request-search-container">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchInput}
                  id="search-input"
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="button">
                  <img
                    className="admin-request-search-img"
                    src={search}
                    alt="Search"
                  />
                </button>
              </div>
            </div>

            <div className="admin-request-tabs">
              <button
                className={`admin-request-tab ${typeFlag === "application" ? "active" : ""}`}
                onClick={() => handleTabSwitch("application")}
              >
                Application
              </button>
              <button
                className={`admin-request-tab ${typeFlag === "deferral" ? "active" : ""}`}
                onClick={() => handleTabSwitch("deferral")}
              >
                Deferral
              </button>
            </div>

            <table className="admin-request-account-table">
              <thead>{renderTableHeader()}</thead>
              <tbody>{renderTableRows()}</tbody>
            </table>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminRequests;