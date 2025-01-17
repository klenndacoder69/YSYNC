import React, { useState } from 'react';
import './admin-requests.css';

import logo from "C:/Users/lazzz/Desktop/Jpad3/YSYNC_Project_PAD/ysync_plain/assets/logo.png"
import group from "C:/Users/lazzz/Desktop/Jpad3/YSYNC_Project_PAD/ysync_plain/assets/Group_fill.png";
import bell from "C:/Users/lazzz/Desktop/Jpad3/YSYNC_Project_PAD/ysync_plain/assets/Bell_pin.png";
import flag from "C:/Users/lazzz/Desktop/Jpad3/YSYNC_Project_PAD/ysync_plain/assets/flag.png";
import search from "C:/Users/lazzz/Desktop/Jpad3/YSYNC_Project_PAD/ysync_plain/assets/magnifying-glass.png";

const AdminRequests = () => {
  const [activeTab, setActiveTab] = useState("Application");

  const switchTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <a href="../acc-info/admin-acc-info.html">
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
              alt=""
            />
            <a href="../acc-info/admin-acc-info.html" className="menu-item">
              Account Information
            </a>
            <br />
          </div>
          <div className="menu-container active">
            <img
              className="menu-img"
              src={bell}
              alt=""
            />
            <a href="../requests/admin-requests.html" className="menu-item">
              Requests
            </a>
            <br />
          </div>
          <div className="menu-container">
            <img
              className="menu-img"
              src={flag}
              alt=""
            />
            <a href="../reports/admin-reports.html" className="menu-item">
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
              / {activeTab}
            </span>
          </h1>
        </header>

        <div className="table-content">
          <div className="search-bar">
            <div className="search-container">
              <input type="text" placeholder="Search" id="search-input" />
              <button type="submit" id="submit">
                <img
                  className="search-img"
                  src="../../assets/magnifying-glass.png"
                  alt=""
                />
              </button>
            </div>
          </div>

          <div className="tabs">
            <button
              className={`tab ${activeTab === "Application" ? "active" : ""}`}
              id="application-tab"
              onClick={() => switchTab("Application")}
            >
              Application
            </button>
            <button
              className={`tab ${activeTab === "Deferral" ? "active" : ""}`}
              id="deferral-tab"
              onClick={() => switchTab("Deferral")}
            >
              Deferral
            </button>
          </div>

          <div className="table-textfields">
            <table className="account-table" id="account-table-id">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>APPLICATION FORM</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody id="table-values">
                {activeTab === "Application" ? (
                  <>
                    <tr>
                      <td>
                        <div className="table-align-picture">
                          <div className="circle"></div>John Doe
                        </div>
                      </td>
                      <td>jdoe@up.edu.ph</td>
                      <td>
                        <a href="#">View Form</a>
                      </td>
                      <td>
                        <div className="button-div">
                          <button className="accept-btn">Accept</button>
                          <button className="decline-btn">Decline</button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="table-align-picture">
                          <div className="circle"></div>Ada Lovelace
                        </div>
                      </td>
                      <td>alovelace@up.edu.ph</td>
                      <td>
                        <a href="#">View Form</a>
                      </td>
                      <td>
                        <button className="accept-btn">Accept</button>
                        <button className="decline-btn">Decline</button>
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr>
                      <td>
                        <div className="table-align-picture">
                          <div className="circle"></div>Alan Turing
                        </div>
                      </td>
                      <td>aturing@up.edu.ph</td>
                      <td>
                        <a href="#">View Form</a>
                      </td>
                      <td>
                        <div className="button-div">
                          <button className="accept-btn">Approve</button>
                          <button className="decline-btn">Reject</button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="table-align-picture">
                          <div className="circle"></div>Grace Hopper
                        </div>
                      </td>
                      <td>ghopper@up.edu.ph</td>
                      <td>
                        <a href="#">View Form</a>
                      </td>
                      <td>
                        <button className="accept-btn">Approve</button>
                        <button className="decline-btn">Reject</button>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminRequests;