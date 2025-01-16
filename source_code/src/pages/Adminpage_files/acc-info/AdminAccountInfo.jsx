import { useEffect, useState } from "react";
import "../Adminpage.css";
import api from "../../../api/axios";

const AdminAccountInfo = () => {
  const [trainees, getTrainees] = useState([]);
  const [residentMembers, getResidentMembers] = useState([]);
  const [activeButton, setActiveButton] = useState("trainees");
  //for edit form
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [batch, setBatch] = useState("");
  const [interests, setInterests] = useState(""); //keep in mind this is a string, still needs to be processed
  const [popup, setPopup] = useState({
    visible: false,
    x: 0,
    y: 0,
    user: {},
    action: null, // what action edit / delete
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (popup.visible && popup.user) {
      const { userId, traineeId } = popup.user;
      setFirstName(userId.firstName || "");
      setMiddleName(userId.middleName || "");
      setLastName(userId.lastName || "");
      setEmail(userId.email || "");
      setBatch(traineeId?.univBatch || popup.user.univBatch || "");
      setInterests(
        traineeId?.interests?.join(", ") || (popup.user.interests?.join(", ") || "")
      );
    } else {
      // Reset the form fields when popup is closed
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setEmail("");
      setBatch("");
      setInterests("");
    }
  }, [popup]);
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };


const handleEditUser = async (user) => {
  // Logic for handling edit
  // When handling the edit, we must first check if the user is a trainee or not since they have different properties
  // The server must only receive the json object (user w/ updated details), and the userType for easier processing

  event.preventDefault();
  console.log("Editing user:", user.userId);

  if (user.traineeId && user.userId) {
    user.traineeId.interests = interests.split(",");
    user.userId.firstName = firstName;
    user.userId.middleName = middleName;
    user.userId.lastName = lastName;
    user.userId.email = email;
    user.traineeId.univBatch = batch;
    console.log("Sending resident member details...", user);
  } else if (user.userId) {
    user.userId.firstName = firstName;
    user.userId.middleName = middleName;
    user.userId.lastName = lastName;
    user.userId.email = email;
    user.univBatch = batch
    user.interests = interests.split(",");
    console.log("Sending trainee details...", user);
  } else {
    throw new Error("Invalid user data.");
  }

  try {
    const response = await api.put("/editUser", {
      user: { ...user, updatedAt: new Date() },
      userType: user.traineeId && user.userId ? "residentMember" : "trainee",
      userId: user._id,
    });

    if (response) {
      console.log("User updated successfully.");

      // Update state with the edited user
      if (user.traineeId) {
        getResidentMembers((prev) =>
          prev.map((member) =>
            member._id === user._id ? { ...member, ...user } : member
          )
        );
      } else {
        getTrainees((prev) =>
          prev.map((trainee) =>
            trainee._id === user._id ? { ...trainee, ...user } : trainee
          )
        );
      }
    }
  } catch (error) {
    if (error.response) {
      console.log("Error response status: ", error.response.status);
    } else {
      console.log("Cannot retrieve response.");
    }
  }

  hidePopup();
};

  const handleDeleteUser = async (user) => {
    // Logic for handling delete
    event.preventDefault();
    console.log("Deleting user:", user.userId);
  
    try {
      const response = await api.post("/deleteUser", {
        user,
        userType: user.traineeId && user.userId ? "residentMember" : "trainee",
      });
  
      if (response) {
        console.log("User deleted successfully.");
  
        // Remove user from the state
        if (user.traineeId) {
          getResidentMembers((prev) =>
            prev.filter((member) => member._id !== user._id)
          );
        } else {
          getTrainees((prev) =>
            prev.filter((trainee) => trainee._id !== user._id)
          );
        }
      }
    } catch (error) {
      if (error.response) {
        console.log("Error response status: ", error.response.status);
      } else {
        console.log("Cannot retrieve response.");
      }
    }
  
    hidePopup();
  };

  const fetchTrainees = async () => {
    try {
      const response = await api.get("/getAllTrainees");
      if (response) {
        getTrainees(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchResidentMembers = async () => {
    try {
      const response = await api.get("/getAllResidentMembers");
      if (response) {
        getResidentMembers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrainees();
    fetchResidentMembers();
  }, []);
  // here everytime changes are made, we refetch the table (this useEffect is kind of inefficient...)
  // useEffect(() => {
  //   fetchTrainees();
  //   fetchResidentMembers();
  // }, [popup.visible]);

  const showPopup = (e, user, action) => {
    setPopup({ visible: true, x: e.clientX - 125, y: e.clientY, user, action });
  };

  const hidePopup = () => {
    setPopup({ ...popup, visible: false });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTrainees = trainees.filter((trainee) => {
    const { firstName, middleName, lastName, email } = trainee.userId;
    const fullName = `${firstName} ${middleName} ${lastName}`.toLowerCase();
    const search = searchQuery.toLowerCase();
    return fullName.includes(search) || email.toLowerCase().includes(search);
  });

  const filteredResidentMembers = residentMembers.filter((residentMember) => {
    const { firstName, middleName, lastName, email } = residentMember.userId;
    const fullName = `${firstName} ${middleName} ${lastName}`.toLowerCase();
    const search = searchQuery.toLowerCase();
    return fullName.includes(search) || email.toLowerCase().includes(search);
  });

  const renderTraineeTable = () => {
    return filteredTrainees.map((trainee) => {
      const { firstName, middleName, lastName, email, userType } = trainee.userId;
      const { univBatch } = trainee;
      if (userType === "residentMember" || userType === "admin") return null;
      return (
        <tr key={trainee._id} className="table-row-values-admin-dashboard">
          <td>
            <div className="table-align-picture-admin-dashboard">
              <div className="circle"></div>
              {`${firstName} ${middleName} ${lastName}`}
            </div>
          </td>
          <td>{email}</td>
          <td>{univBatch}</td>
          <td>
            {trainee.interests.map((interest) => `${interest}`).join(", ")}
          </td>
          <td>
            <button
              className="vert-ellipsis"
              onClick={(e) => showPopup(e, trainee, "edit")}
            >
              ⋮
            </button>
            <button
              className="vert-ellipsis"
              onClick={(e) => showPopup(e, trainee, "delete")}
            >
              🗑️
            </button>
          </td>
        </tr>
      );
    });
  };

  const renderResidentMemberTable = () => {
    return filteredResidentMembers.map((residentMember) => {
      const { firstName, middleName, lastName, email, userType } =
        residentMember.userId;
      const { univBatch } = residentMember.traineeId;
      if (userType === "trainee" || userType === "admin") return null;
      return (
        <tr key={residentMember._id}>
          <td>
            <div className="table-align-picture-admin-dashboard">
              <div className="circle"></div>
              {`${firstName} ${middleName} ${lastName}`}
            </div>
          </td>
          <td>{email}</td>
          <td>{univBatch}</td>
          <td>
            {residentMember.traineeId.interests
              .map((interest) => `${interest}`)
              .join(", ")}
          </td>
          <td>
            <button
              className="vert-ellipsis"
              onClick={(e) => showPopup(e, residentMember, "edit")}
            >
              ⋮
            </button>
            <button
              className="vert-ellipsis"
              onClick={(e) => showPopup(e, residentMember, "delete")}
            >
              🗑️
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <main className="main-content-admin-dashboard">
        <header className="header-admin-dashboard">
          <h1>
            <span className="header-main-title-admin-dashboard">
              Account Information
            </span>
            <span className="header-main-secondary-admin-dashboard">
              / {activeButton === "trainees" ? "Trainees" : "Members"}
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
                ></img>
              </button>
            </div>
          </div>

          <div className="tabs-admin-dashboard">
            <button
              className={
                activeButton === "trainees"
                  ? "tab-admin-dashboard active"
                  : "tab-admin-dashboard"
              }
              onClick={() => handleButtonClick("trainees")}
              id="trainees-tab-admin-dashboard"
            >
              Trainees
            </button>
            <button
              className={
                activeButton === "members"
                  ? "tab-admin-dashboard active"
                  : "tab-admin-dashboard"
              }
              onClick={() => handleButtonClick("members")}
              id="members-tab-admin-dashboard"
            >
              Members
            </button>
          </div>

          <div className="table-textfields-admin-dashboard">
            <table
              className="account-table-admin-dashboard"
              id="account-table-id-admin-dashboard"
            >
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>BATCH</th>
                  <th>INTERESTS</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody id="table-values-admin-dashboard">
                {activeButton === "trainees" ? (
                  filteredTrainees && filteredTrainees.length > 0 ? (
                    renderTraineeTable()
                  ) : (
                    <tr>
                      <td colSpan="5">No data available</td>
                    </tr>
                  )
                ) : filteredResidentMembers &&
                  filteredResidentMembers.length > 0 ? (
                  renderResidentMemberTable()
                ) : (
                  <tr>
                    <td colSpan="5">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {popup.visible && (
          <div className="modal-overlay">
            {popup.action === "edit" && (
              <div className="edit-user-modal">
                <div className="modal-header">
                  <h2>Edit User</h2>
                  <button className="close-modal" onClick={hidePopup}>
                    &times;
                  </button>
                </div>
                <form className="edit-user-modal-form">
                  <label>
                    First Name
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => {setFirstName(e.target.value); console.log(firstName)}}/>
                  </label>
                  <label>
                    Middle Name
                    <input type="text" placeholder="Middle Name" value={middleName} onChange={(e) => setMiddleName(e.target.value)}/>
                  </label>

                  <label>
                    Last Name
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                  </label>
                  <label>
                    Email
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </label>
                  <label>
                    Batch
                    <input type="text" placeholder="Batch" value={batch} onChange={(e) => setBatch(e.target.value)}/>
                  </label>
                  <label>
                    Interests
                    <input
                      type="text"
                      placeholder="Interests"
                      value={
                        interests
                      }
                      onChange={(e) => setInterests(e.target.value)}
                    />
                  </label>
                  <div className="edit-user-modal-buttons">
                    <button type="submit" onClick={() => handleEditUser(popup.user)}>
                      Edit
                    </button>
                    <button type="button" onClick={hidePopup}>
                      Cancel
                    </button>
                  </div>
                  
                </form>
              </div>
            )}
            {popup.action === "delete" && (
              <div className="delete-user-modal">
                <h2>Are you sure you want to delete this user?</h2>
                <button
                  className="delete-confirm-button"
                  onClick={() => handleDeleteUser(popup.user)}
                >
                  Delete
                </button>
                <button className="cancel-button" onClick={hidePopup}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default AdminAccountInfo;
