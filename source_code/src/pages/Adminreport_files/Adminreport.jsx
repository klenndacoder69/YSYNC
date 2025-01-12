import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Adminreport.css";

import group from "./assets/Group_fill.png";
import bell from "./assets/Bell_pin.png";
import flag from "./assets/flag.png";
import search from "./assets/magnifying-glass.png";

const pendingData = [
    {
        name: "John Doe",
        email: "jdoe@up.edu.ph",
        dateSubmitted: "2023-09-01",
        reason: "Personal reasons",
        actions: "...",
    },
    {
        name: "Ada Lovelace",
        email: "alovelace@up.edu.ph",
        dateSubmitted: "2023-09-02",
        reason: "Health issues",
        actions: "...",
    },
    {
        name: "George Bool",
        email: "gboole@up.edu.ph",
        dateSubmitted: "2023-09-03",
        reason: "Family commitments",
        actions: "...",
    },
    {
        name: "Bill Gates",
        email: "bgates@up.edu.ph",
        dateSubmitted: "2023-09-04",
        reason: "Traveling",
        actions: "...",
    },
];

const resolvedData = [
    {
        name: "John Doe",
        email: "jdoe@up.edu.ph",
        dateSubmitted: "2023-05-01",
        reason: "Personal reasons",
        dateResolved: "2023-09-05",
    },
    {
        name: "Ada Lovelace",
        email: "alovelace@up.edu.ph",
        dateSubmitted: "2023-06-01",
        reason: "Health issues",
        dateResolved: "2023-09-06",
    },
    {
        name: "George Bool",
        email: "gboole@up.edu.ph",
        dateSubmitted: "2023-07-01",
        reason: "Family commitments",
        dateResolved: "2023-09-07",
    },
    {
        name: "Bill Gates",
        email: "bgates@up.edu.ph",
        dateSubmitted: "2023-08-01",
        reason: "Traveling",
        dateResolved: "2023-09-08",
    },
];

export default function AdminReport() {
    const [typeFlag, setTypeFlag] = useState("pending");
    const [data, setData] = useState(pendingData);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        if (typeFlag === "pending") {
            setData(pendingData);
        } else {
            setData(resolvedData);
        }
    }, [typeFlag]);

    const handleSearch = () => {
        const filteredData = data.filter((user) =>
            user.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setData(filteredData);
    };

    const handleTabSwitch = (type) => {
        setTypeFlag(type);
        setSearchInput("");
    };

    const renderTableHeaders = () => {
        return typeFlag === "pending"
            ? ["NAME", "EMAIL", "DATE SUBMITTED", "REASON", "ACTIONS"]
            : ["NAME", "EMAIL", "DATE SUBMITTED", "REASON", "DATE RESOLVED"];
    };

    const renderTableRows = () => {
        return data.map((user, index) => (
            <tr key={index}>
                <td>
                    <div className="table-align-picture">
                        <div className="circle"></div>
                        {user.name}
                    </div>
                </td>
                <td>{user.email}</td>
                <td>{user.dateSubmitted}</td>
                <td>{user.reason}</td>
                {typeFlag === "pending" ? (
                    <td>
                        <div className="button-div">
                            <button className="accept-btn">Resolve</button>
                            <button className="decline-btn">Delete</button>
                        </div>
                    </td>
                ) : (
                    <td>{user.dateResolved}</td>
                )}
            </tr>
        ));
    };

    return (
        <div className="container">
            <aside className="sidebar">
                <div className="logo">
                    <Link to="/acc-info/admin-acc-info">
                        <img
                            className="logo-img"
                            src="../../assets/logo.png"
                            alt="YSYNC Logo"
                        />
                    </Link>
                    <h2>YSYNC</h2>
                </div>
                <nav className="menu">
                    <div className="menu-container">
                        <img
                            className="menu-img"
                            src={group}
                            alt="AccInfo"
                        />
                        <Link to="/acc-info/admin-acc-info" className="menu-item">
                            Account Information
                        </Link>
                    </div>
                    <div className="menu-container">
                        <img
                            className="menu-img"
                            src= {bell}
                            alt="Requests"
                        />
                        <Link to="/requests/admin-requests" className="menu-item">
                            Requests
                        </Link>
                    </div>
                    <div className="menu-container active">
                        <img
                            className="menu-img"
                            src={flag}
                            alt="Reports"
                        />
                        <Link to="/reports/admin-reports" className="menu-item">
                            Reports
                        </Link>
                    </div>
                </nav>
                <div className="admin-account">
                    <p>ADMIN ACCOUNT</p>
                </div>
            </aside>

            <main className="main-content">
                <header className="header">
                    <h1>
                        <span className="header-main-title">Reports</span>
                        <span className="header-main-secondary">
                            {typeFlag === "pending" ? "/ Pending" : "/ Resolved"}
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
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyUp={handleSearch}
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
                            className={`tab ${typeFlag === "pending" ? "active" : ""}`}
                            onClick={() => handleTabSwitch("pending")}
                        >
                            Pending
                        </button>
                        <button
                            className={`tab ${typeFlag === "resolved" ? "active" : ""}`}
                            onClick={() => handleTabSwitch("resolved")}
                        >
                            Resolved
                        </button>
                    </div>

                    <div className="table-textfields">
                        <table className="account-table">
                            <thead>
                                <tr>
                                    {renderTableHeaders().map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>{renderTableRows()}</tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
