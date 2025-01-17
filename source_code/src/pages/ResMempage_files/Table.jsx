import React, { useState } from "react";
import "./Table.css"
import SearchBar from "./SearchBar.jsx";

const tabs = ["active", "inactive", "alumni"]
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
function Table({values}) {
  const [type, setType] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  // filter the resident members based on status
  const filteredData = values.filter((resMem) => {
    const name = `${resMem.userId.firstName} ${resMem.userId.middleName} ${resMem.userId.lastName}`;
    const search = searchTerm.toLowerCase();
    return name.toLowerCase().includes(search) && resMem.status === type;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }
  return (
    <>
    <div className="resmem-table-content">
    <div className="search-bar-resmem">
    <div className="search-container-resmem">
      <input
        type="text"
        placeholder="Search"
        id="search-input-resmem"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button type="submit" id="submit-resmem">
        <img
          className="search-img-resmem"
          src="/assets/magnifying-glass.png"
          alt="Search"
        ></img>
      </button>
    </div>
  </div>
    <div className="resmem-table-textfields">
      <div className="resmem-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`resmem-tab ${type === `${tab}` ? "active" : ""}`}
            onClick={() => setType(tab)}
          >
            <p>{capitalize(tab)}</p> 
          </button>
        ))}
      </div>

      <table className="resmem-account-table" id="account-table-id-resmem">
        <thead>
          <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>BATCH</th>
            <th>ORG BATCH</th>
            <th> </th>
          </tr>
        </thead>
        <tbody id="table-values-resmem">
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>
                <div className="table-align-picture-resmem">
                  <div className="circle"><img src={row.userId.image}/></div>
                  {`${row.userId.firstName} ${row.userId.middleName} ${row.userId.lastName}`}
                </div>
              </td>
              <td>{row.userId.email}</td>
              <td>{row.traineeId.univBatch}</td>
              <td>{row.orgBatch}</td>
              <td>{row.additionalInfo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </>
  );
}

export default Table;
