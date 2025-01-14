import { useEffect, useState } from "react";
import api from "../../api/axios.js";

export default function Report() {
    const [user, setUser] = useState(null);
    const [reportUser, setReportUser] = useState(""); // user to be reported
    const [reportReason, setReportReason] = useState(""); // State variable for text input
    

    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [submitError, setSubmitError] = useState(""); // State variable for submit error

      // Fetch user data
      useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetching user data
                const userResponse = await api.get('users/678510c4aa4de02c28d1c165');
                setUser(userResponse.data);

                // Fetching all users
                const allUsersResponse = await api.get('getAllUsers');
                setUsers(allUsersResponse.data);

            } catch (error) {
                setErrorMessage("Failed to fetch data.");
                console.error("Error fetching data:", error);
            }
        };
        fetchUserData();
        setErrorMessage(''); // Clear any previous error messages
    }, []); // Runs only once after the initial render

    
    const handleTextChange = (event) => {
        setReportReason(event.target.value);
    };

    const handleUserChange = (event) => {
        const user = users.find(user => user._id === event.target.value);
        setReportUser(user);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        if (!reportReason) {
            setSubmitError("Report reason is required.");
            return;
        }
        if (!reportUser) {
            setSubmitError("User to be reported is required.");
            return;
        }
        setSubmitError(""); // Clear any previous submit errors

        try {
            console.log(reportUser.email);
            const response = await api.post("/auth/report", {
                email: user.email,
                reportedEmail: reportUser.email,
                reason: reportReason
            });
            if (response) {
                alert("Submitted successfully!");
                return response.data;
            }
        } catch (error) {
            if (error.response) {
                console.log("Error response status: ", error.response.status);
                if (error.response.status === 400) {
                    setSubmitError("DeferTrainee already exists.");
                } else if (error.response.status === 500) {
                    setSubmitError("An error has occurred while submitting.");
                }
            } else {
                alert("A network error has occurred.");
            }
        }
  
    };
    return (
        <div>

            <h1>Report Page</h1>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <label>Report User:</label>
                    <select value={reportUser} onChange={handleUserChange}>
                        <option value="">Select a user</option>
                        {users.map(user => (
                            <option key={user._id} value={user._id}>
                                {user.firstName} {user.lastName} - {user.email}
                            </option>
                        ))}
                    </select>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Report Reason:</label>
                    <br></br>
                    <textarea
                        value={reportReason}
                        onChange={handleTextChange}
                        rows="4"
                        cols="50"
                        placeholder="State your reasons here..."
                    />
                </div>
                <button type="submit">Submit</button>
                <br></br>
                {submitError && <p className="error">{submitError}</p>}
            </form>

        </div>
    );
}