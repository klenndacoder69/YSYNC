import { useEffect, useState } from "react";
import "../Adminpage.css";
import api from "../../../api/axios";

const AdminRequests = () => {
  const [applicationRequests, setApplicationRequests] = useState([]); // Application requests
  const [deferralRequests, setDeferralRequests] = useState([]); // Deferral requests
  const [activeTab, setActiveTab] = useState("application");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch requests
  const fetchRequests = async () => {
    try {
      const response = await api.get("/getAllRequestApplications");
      if (response) {
        setApplicationRequests(response.data);
      }
      const response2 = await api.get("/getAllRequestDeferrals");
      if (response2) {
        setDeferralRequests(response2.data);
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
  const filteredApplicationRequests = applicationRequests.filter((request) => {
    const { userId } = request;
    const search = searchQuery.toLowerCase();
    const name =
      `${userId.firstName} ${userId.middleName} ${userId.lastName}`.toLowerCase();
    const matchesSearch = name.includes(search);
    return matchesSearch;
  });

  const filteredDeferralRequests = deferralRequests.filter((request) => {
    const { userId } = request;
    const search = searchQuery.toLowerCase();
    const name =
      `${userId.firstName} ${userId.middleName} ${userId.lastName}`.toLowerCase();
    const matchesSearch = name.includes(search);
    return matchesSearch;
  });
  // Handle Accept button click
  const handleAccept = async (requestId, type) => {
    try {
      if (type === "application") {
        const response = await api.post(`/acceptApplication/${requestId}`);
        if (response) {
          console.log("Application accepted successfully.");
          fetchRequests();
          alert("Application accepted successfully.");
        }
      } else if (type === "deferral") {
        console.log(requestId);
        const response = await api.post(`/acceptDeferral/${requestId}`);
        if (response) {
          console.log("Deferral accepted successfully.");
          fetchRequests();
          alert("Deferral accepted successfully.");
        }
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  // Handle Decline button click
  const handleDecline = async (requestId, type) => {
    try {
      if (type === "application") {
        const response = await api.post(`/declineApplication/${requestId}`);
        if (response) {
          console.log("Application declined successfully.");
          fetchRequests();
          alert("Application declined successfully.");
        }
      } else if (type === "deferral") {
        const response = await api.post(`/declineDeferral/${requestId}`);
        if (response) {
          console.log("Deferral declined successfully.");
          fetchRequests();
          alert("Deferral declined successfully.");
        }
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
                  src="/assets/magnifying-glass.png"
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
                  <th>
                    {activeTab === "application"
                      ? "APPLICATION FORM"
                      : "REASON"}
                  </th>
                  <th>DATE CREATED</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {activeTab === "application" ? (
                  filteredApplicationRequests.length > 0 ? (
                    filteredApplicationRequests.map((request, index) => (
                      <tr key={index}>
                        <td>{`${request.userId.firstName} ${request.userId.middleName} ${request.userId.lastName}`}</td>
                        <td>{request.userId.email}</td>
                        <td>
                          <a
                            href={request.appForm}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            LINK
                          </a>
                        </td>
                        <td>{request.createdAt}</td>
                        <td>
                          <strong>{request.status.toUpperCase()}</strong>
                        </td>
                        <td>
                          {request.status === "pending" ? (
                            <div className="button-div-admin-dashboard">
                              <button
                                className="accept-btn-admin-dashboard"
                                onClick={() =>
                                  handleAccept(request._id, "application")
                                }
                              >
                                Accept
                              </button>
                              <button
                                className="decline-btn-admin-dashboard"
                                onClick={() =>
                                  handleDecline(request._id, "application")
                                }
                              >
                                Decline
                              </button>
                            </div>
                          ) : (
                            <strong>DONE</strong>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No data available</td>
                    </tr>
                  )
                ) : filteredDeferralRequests.length > 0 ? (
                  filteredDeferralRequests.map((request, index) => (
                    <tr key={index}>
                      <td>{`${request.userId.firstName} ${request.userId.middleName} ${request.userId.lastName}`}</td>
                      <td>{request.userId.email}</td>
                      <td>{request.reason}</td>
                      <td>{request.createdAt}</td>
                      <td>
                        <strong>{request.status.toUpperCase()}</strong>
                      </td>
                      <td>
                        {request.status === "pending" ? (
                          <div className="button-div-admin-dashboard">
                            <button
                              className="accept-btn-admin-dashboard"
                              onClick={() =>
                                handleAccept(request._id, "deferral")
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="decline-btn-admin-dashboard"
                              onClick={() =>
                                handleDecline(request._id, "deferral")
                              }
                            >
                              Decline
                            </button>
                          </div>
                        ) : (
                          <b>DONE</b>
                        )}
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
