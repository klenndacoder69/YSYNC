import { useEffect, useState } from "react";
import "../Adminpage.css";
import api from "../../../api/axios";
import { toast } from "sonner";
import AdminEditFormComponent from "./AdminEditFormComponent";

const AdminAccountInfo = () => {
  const [trainees, getTrainees] = useState([]);
  const [residentMembers, getResidentMembers] = useState([]);
  const [users, setUsers] = useState([]);
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
      setFirstName(userId?.firstName || popup.user.firstName || "");
      setMiddleName(userId?.middleName || popup.user.middleName || "");
      setLastName(userId?.lastName || popup.user.lastName || "");
      setEmail(userId?.email || popup.user.email || "");
      setBatch(traineeId?.univBatch || popup.user.univBatch || "");
      setInterests(
        traineeId?.interests?.join(", ") ||
          popup.user.interests?.join(", ") ||
          ""
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
    
    // check whether user is a resident member (which consists of a traineeId and userId)
    if (user.traineeId && user.userId) {
        user.traineeId.interests = interests.split(",");
        user.userId.firstName = firstName;
        user.userId.middleName = middleName;
        user.userId.lastName = lastName;
        user.userId.email = email;
        user.traineeId.univBatch = batch;
        // if user does not have a traineeId, then it might be a trainee
    } else if (user.userId) {
        user.userId.firstName = firstName;
        user.userId.middleName = middleName;
        user.userId.lastName = lastName;
        user.userId.email = email;
        user.univBatch = batch;
        user.interests = interests.split(",");
    }
        // if user does not have a traineeId or userId, then we just edit the user details
      else if (user) {
        user.firstname = firstName;
        user.middleName = middleName;
        user.lastName = lastName;
        user.email = email;
        user.univBatch = batch;
      }
      else {
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
    toast.success("User updated successfully.");
  };

  const handleDeleteUser = async (user) => {
    // Logic for handling delete
    event.preventDefault();

    try {
      const response = await api.post("/deleteUser", {
        user,
        userType: user.traineeId && user.userId ? "residentMember" : "trainee",
      });

      if (response) {

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
    toast.success("User deleted successfully.");
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

  const fetchUsers = async () => {
    try {
      const response = await api.get("/getAllUsers");
      if (response) {
        setUsers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrainees();
    fetchResidentMembers();
    fetchUsers();
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
      const { firstName, middleName, lastName, email, userType, image } =
        trainee.userId;
      const { univBatch } = trainee;
      if (userType === "residentMember" || userType === "admin") return null;
      return (
        <tr key={trainee._id} className="table-row-values-admin-dashboard">
          <td>
            <div className="table-align-picture-admin-dashboard">
              <div className="circle">
              <img src={image}/>
              </div>
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


  const renderUsersTable = () => {
    return users.map((user, index) => {
      const { firstName, middleName, lastName, email, image } =
      user;
      return (
        <tr key={index}>
          <td>
            <div className="table-align-picture-admin-dashboard">
              <div className="circle">
                <img src={image}/>
              </div>
              {`${firstName} ${middleName} ${lastName}`}
            </div>
          </td>
          <td>{email}</td>
          <td>
            <button
              className="vert-ellipsis"
              onClick={(e) => showPopup(e, user, "edit")}
            >
              ⋮
            </button>
            <button
              className="vert-ellipsis"
              onClick={(e) => showPopup(e, user, "delete")}
            >
              🗑️
            </button>
          </td>
          <td></td>
        </tr>
      );
    });
  };

  const renderResidentMemberTable = () => {
    return filteredResidentMembers.map((user, index) => {
      const { userId, traineeId } = user;
      const {firstName, middleName, lastName, email, userType, image} = userId;
      const {univBatch, interests} = traineeId;
      if (userType === "trainee" || userType === "admin") return null;
      return (
        <tr key={index}>
          <td>
            <div className="table-align-picture-admin-dashboard">
              <div className="circle">
              <img src={image}/>
              </div>
              {`${firstName} ${middleName} ${lastName}`}
            </div>
          </td>
          <td>{email}</td>
          <td>{univBatch}</td>
          <td>
            {interests
              .map((interest) => `${interest}`)
              .join(", ")}
          </td>
          <td>
            <button
              className="vert-ellipsis"
              onClick={(e) => showPopup(e, user, "edit")}
            >
              ⋮
            </button>
            <button
              className="vert-ellipsis"
              onClick={(e) => showPopup(e, user, "delete")}
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
              /{" "}
              {activeButton === "trainees"
                ? "Trainees"
                : activeButton === "members"
                ? "Members"
                : "Users"}
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
            <button
              className={
                activeButton === "users"
                  ? "tab-admin-dashboard active"
                  : "tab-admin-dashboard"
              }
              onClick={() => handleButtonClick("users")}
              id="members-tab-admin-dashboard"
            >
              Users
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
                  {activeButton !== "users" && (<><th>BATCH</th> <th>INTERESTS</th></>)}
                  {activeButton === "users" && <th></th>}
                  <th></th>

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
                ) : activeButton === "members" ? (
                  filteredResidentMembers &&
                  filteredResidentMembers.length > 0 ? (
                    renderResidentMemberTable()
                  ) : (
                    <tr>
                      <td colSpan="5">No data available</td>
                    </tr>
                  )
                ) : (
                  renderUsersTable()
                )}
              </tbody>
            </table>
          </div>
        </div>

        {popup.visible && (
          <div className="modal-overlay">
            {
              <AdminEditFormComponent
                firstName={firstName}
                middleName={middleName}
                lastName={lastName}
                email={email}
                batch={batch}
                interests={interests}
                popup={popup}
                hidePopup={hidePopup}
                setFirstname={setFirstName}
                setMiddleName={setMiddleName}
                setLastName={setLastName}
                setEmail={setEmail}
                setBatch={setBatch}
                setInterests={setInterests}
                handleEditUser={handleEditUser}
                handleDeleteUser={handleDeleteUser}
                action={popup.action}
              />
            }
          </div>
        )}
      </main>
    </>
  );
};

export default AdminAccountInfo;
