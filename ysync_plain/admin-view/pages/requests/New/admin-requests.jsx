import React, { useState, useEffect } from "react";
import "./admin-requests.css";

import logo from "C:/Users/lazzz/Desktop/Jpad3/YSYNC_Project_PAD/ysync_plain/admin-view/assets/logo.png"
import group from "C:/Users/lazzz/Desktop/Jpad3/YSYNC_Project_PAD/ysync_plain/admin-view/assets/Group_fill.png";
import bell from "C:/Users/lazzz/Desktop/Jpad3/YSYNC_Project_PAD/ysync_plain/admin-view/assets/Bell_pin.png";
import flag from "C:/Users/lazzz/Desktop/Jpad3/YSYNC_Project_PAD/ysync_plain/admin-view/assets/flag.png";

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
          <div className="table-align-picture-adreq">
            <div className="circle-adreq" />
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
              <div className="button-div-adreq">
                <button className="accept-btn-adreq">Accept</button>
                <button className="decline-btn-adreq">Decline</button>
              </div>
            </td>
          </>
        ) : (
          <>
            <td>{item.dateSubmitted}</td>
            <td>{item.reason}</td>
            <td>
              <div className="button-div-adreq">
                <button className="accept-btn-adreq">Accept</button>
                <button className="decline-btn-adreq">Decline</button>
              </div>
            </td>
          </>
        )}
      </tr>
    ));
  };

  return (
    <div className="body-adreq">
    <div className="container-adreq">
      <aside className="sidebar-adreq">
        <div className="logo-adreq">
          <a href="#">
            <img
                className="logo-img-adreq"
                src={logo}
                alt="YSYNC Logo"
            />
          </a>
          <h2>YSYNC</h2>
        </div>
        <nav className="menu-adreq">
          <div className="menu-container-adreq">
            <img
                className="menu-img-adreq"
                src={group}
                alt="Account Information"
            />
            <a href="#" className="menu-item-adreq">Account Information</a>
          </div>
          <div className="menu-container-adreq active">
            <img
                className="menu-img-adreq"
                src={bell}
                alt="Requests"
            />
            <a href="#" className="menu-item-adreq">Requests</a>
          </div>
          <div className="menu-container-adreq">
            <img
                className="menu-img-adreq"
                src={flag}
                alt="Reports" />
            <a href="#" className="menu-item-adreq">Reports</a>
          </div>
        </nav>
        <div className="admin-account-adreq">
          <p>ADMIN ACCOUNT</p>
        </div>
      </aside>

      <div className="main-content-adreq">
        <header className="header-adreq">
          <h1>
            <span className="header-main-title-adreq">Requests </span>
            <span className="header-main-secondary-adreq">
              {typeFlag === "application" ? "/ Application" : "/ Deferral"}
            </span>
          </h1>
        </header>

        <div className="table-content-adreq">
          <div className="search-bar-adreq">
            <div className="search-container-adreq">
              <input
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>

          <div className="tabs-adreq">
            <button
              className={`tab-adreq ${typeFlag === "application" ? "active" : ""}`}
              onClick={() => handleTabSwitch("application")}
            >
              Application
            </button>
            <button
              className={`tab-adreq ${typeFlag === "deferral" ? "active" : ""}`}
              onClick={() => handleTabSwitch("deferral")}
            >
              Deferral
            </button>
          </div>

          <table className="account-table-adreq">
            <thead>{renderTableHeader()}</thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminRequests;
