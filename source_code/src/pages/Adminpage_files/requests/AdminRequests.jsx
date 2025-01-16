import { useEffect, useState } from "react";
import "../Adminpage.css";
import api from "../../../api/axios";

const AdminRequests = () => {
  const [requests, setRequests] = useState([]); // All requests
  const [activeTab, setActiveTab] = useState("application"); // Tracks active tab
  const [searchQuery, setSearchQuery] = useState(""); // Tracks search input

  // Fetch requests (replace with your API calls)
  const fetchRequests = async () => {
    try {
      const response = await api.get("/getRequests"); // Adjust endpoint as needed
      if (response) {
        setRequests(response.data);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter requests based on active tab and search query
  const filteredRequests = requests.filter((request) => {
    const { name, email, formLink, status } = request;
    const search = searchQuery.toLowerCase();
    const matchesSearch =
      name.toLowerCase().includes(search) ||
      email.toLowerCase().includes(search) ||
      formLink.toLowerCase().includes(search);
    return matchesSearch && status === activeTab;
  });

  // Handle Accept button click
  const handleAccept = async (requestId) => {
    try {
      const response = await api.post(`/acceptRequest/${requestId}`);
      if (response) {
        console.log("Request accepted successfully.");
        setRequests((prev) =>
          prev.map((request) =>
            request.id === requestId ? { ...request, status: "accepted" } : request
          )
        );
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  // Handle Decline button click
  const handleDecline = async (requestId) => {
    try {
      const response = await api.post(`/declineRequest/${requestId}`);
      if (response) {
        console.log("Request declined successfully.");
        setRequests((prev) =>
          prev.map((request) =>
            request.id === requestId ? { ...request, status: "declined" } : request
          )
        );
      }
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };

  return (
    <>
      <main className="main-content-admin-dashboard">
        <header className="header-admin-dashboard">
          <h1>
            <span className="header-main-title-admin-dashboard">Requests</span>
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
                  src="./assets/magnifying-glass.png"
                  alt="Search"
                />
              </button>
            </div>
          </div>

          <div className="tabs-admin-dashboard">
            <button
              className={
                activeTab === "application"
                  ? "tab-admin-dashboard active"
                  : "tab-admin-dashboard"
              }
              onClick={() => setActiveTab("application")}
            >
              Application
            </button>
            <button
              className={
                activeTab === "deferral"
                  ? "tab-admin-dashboard active"
                  : "tab-admin-dashboard"
              }
              onClick={() => setActiveTab("deferral")}
            >
              Deferral
            </button>
          </div>

          <div className="table-textfields-admin-dashboard">
            <table className="account-table-admin-dashboard">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>APPLICATION FORM</th>
                  <th>MENTOR DATE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.name}</td>
                      <td>{request.email}</td>
                      <td>
                        <a href={request.formLink} target="_blank" rel="noopener noreferrer">
                          {request.formLink}
                        </a>
                      </td>
                      <td>{request.mentorDate}</td>
                      <td>
                        <button
                          className="accept-button"
                          onClick={() => handleAccept(request.id)}
                        >
                          Accept
                        </button>
                        <button
                          className="decline-button"
                          onClick={() => handleDecline(request.id)}
                        >
                          Decline
                        </button>
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

export default AdminRequests;
