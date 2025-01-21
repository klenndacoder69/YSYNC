export default function AdminEditFormComponent({
  firstName,
  middleName,
  lastName,
  email,
  batch,
  interests,
  setFirstName,
  setMiddleName,
  setLastName,
  setEmail,
  setBatch,
  setInterests,
  popup,
  hidePopup,
  handleEditUser,
  handleDeleteUser,
  action
}) {
  if (action === "edit") {
    return (
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
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                console.log(firstName);
              }}
            />
          </label>
          <label>
            Middle Name
            <input
              type="text"
              placeholder="Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </label>

          <label>
            Last Name
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Batch
            <input
              type="text"
              placeholder="Batch"
              // there are no university batch for the admins and pending users
              disabled={popup.user.userType === "admin" || popup.user.userType === "pending" ? true : false}
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
            />
          </label>
          <label>
            Interests
            <input
              type="text"
              placeholder="Interests"
              // there are no interests for the admins and pending users
              disabled={popup.user.userType === "admin" || popup.user.userType === "pending" ? true : false} 
              value={interests}
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
    );
  }
  if (action === "delete") return (<div className="delete-user-modal">
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
  </div>);
    
  
}
