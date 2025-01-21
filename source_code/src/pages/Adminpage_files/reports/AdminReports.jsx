import { useEffect, useState } from "react";
import "../Adminpage.css";
import api from "../../../api/axios";
import { toast } from "sonner";

const AdminReports = () => {
  const [reports, setReports] = useState([]); // All reports
  const [activeTab, setActiveTab] = useState("pending"); // Tracks active tab
  const [searchQuery, setSearchQuery] = useState(""); // Tracks search input

  // Fetch reports (replace with your API calls)
  const fetchReports = async () => {
    try {
      const response = await api.get("/getAllReports"); // Adjust endpoint as needed
      if (response) {
        setReports(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter reports based on active tab and search query
  const filteredReports = reports.filter((report) => {
    const { firstName, middleName, lastName, email } = report.userId;
    const { reason, createdAt, status } = report;
    console.log(firstName, middleName, lastName, email);
    const name = `${firstName} ${middleName} ${lastName}`;
    const search = searchQuery.toLowerCase();
    const matchesSearch =
      name.toLowerCase().includes(search) ||
      email.toLowerCase().includes(search) ||
      reason.toLowerCase().includes(search) ||
      createdAt.toLowerCase().includes(search);
    return matchesSearch && status === activeTab;
  });

  // Handle Resolve button click
  const handleResolve = async (reportId) => {
    try {
      const response = await api.patch(`/resolveReport/${reportId}`);
      if (response) {
        toast.success("Report resolved successfully.");
        setReports((prev) =>
          prev.map((report) =>
            report._id === reportId ? { ...report, status: "resolved" } : report
          )
        );
      }
    } catch (error) {
      console.error("Error resolving report:", error);
    }
  };

  // Handle Decline button click
  const handleDecline = async (reportId) => {
    try {
      const response = await api.patch(`/declineReport/${reportId}`);
      if (response) {
        toast.success("Report declined successfully.");
        setReports((prev) => prev.filter((report) => report._id !== reportId));
      }
    } catch (error) {
      console.error("Error declining report:", error);
    }
  };

  const handleDelete = async (reportId) => {
    try {
      const response = await api.delete(`/deleteReport/${reportId}`);
      if (response) {
        toast.success("Report deleted successfully.");
        setReports((prev) => prev.filter((report) => report._id !== reportId));
      }
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };
  return (
    <>
      <main className="main-content-admin-dashboard">
        <header className="header-admin-dashboard">
          <h1>
            <span className="header-main-title-admin-dashboard">Reports</span>
            <span className="header-main-secondary-admin-dashboard">
              / {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </span>
          </h1>
        </header>

        <div className="table-content-admin-dashboard">
          <div className="search-bar-admin-dashboard">
            <div className="search-container-admin-dashboard">
              <input
                type="text"
                placeholder="Search"
                id="search-input-admin-dashboard"
                value={searchQuery}
                onChange={handleSearch}
              />
              <button type="submit" id="submit-admin-dashboard">
                <img
                  className="search-img-admin-dashboard"
                  src="/assets/magnifying-glass.png"
                  alt="Search"
                />
              </button>
            </div>
          </div>

          <div className="tabs-admin-dashboard">
            <button
              className={
                activeTab === "pending"
                  ? "tab-admin-dashboard active"
                  : "tab-admin-dashboard"
              }
              onClick={() => setActiveTab("pending")}
            >
              Pending
            </button>
            <button
              className={
                activeTab === "resolved"
                  ? "tab-admin-dashboard active"
                  : "tab-admin-dashboard"
              }
              onClick={() => setActiveTab("resolved")}
            >
              Resolved
            </button>
          </div>

          <div className="table-textfields-admin-dashboard">
            <table className="account-table-admin-dashboard">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>DATE SUBMITTED</th>
                  <th>REASON</th>
                  {activeTab === "resolved" && <th>STATUS</th>}
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((report, index) => (
                    <tr key={index}>
                      <td>
                        {report.userId.firstName} {report.userId.middleName}{" "}
                        {report.userId.lastName}
                      </td>
                      <td>{report.userId.email}</td>
                      <td>{report.createdAt}</td>
                      <td>{report.reason}</td>
                      {activeTab === "resolved" && <td><b>{report.status.toUpperCase()}</b></td>}
                      
                      <td>
                        <div className="button-div-admin-dashboard">
                          {activeTab === "pending" ? (
                            <>
                              <button
                                className="resolve-btn-admin-dashboard"
                                onClick={() => handleResolve(report._id)}
                              >
                                Resolve
                              </button>
                              <button
                                className="decline-btn-admin-dashboard"
                                onClick={() => handleDecline(report._id)}
                              >
                                Decline
                              </button>
                            </>
                          ) : <button
                          className="decline-btn-admin-dashboard"
                          onClick={() => handleDelete(report._id)}
                        >
                          Delete
                        </button>}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminReports;
