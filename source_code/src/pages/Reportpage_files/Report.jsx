import { useEffect, useState } from "react";
import api from "../../api/axios.js";

export default function Report() {
    const [user, setUser] = useState(null);
    const [reportedUser, setReportedUser] = useState(null); // user to be reported
    const [dropdownUser, setDropdownUser] = useState("");
    const [reportReason, setReportReason] = useState(""); // State variable for text input
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [submitError, setSubmitError] = useState(""); // State variable for submit error

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetching user data
                const userResponse = await api.get('users/6786827bafa95af7d2de5094');
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

    const handleDropdownChange = (event) => {
        setDropdownUser(event.target.value);
        const selectedUser = users.find(user => user._id === event.target.value);
        setReportedUser(selectedUser);
    };

    const checkValidCredentials = () => {
        if (user.email === reportedUser.email) {
            return "You cannot report yourself.";
        }
        return null;
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        if (!reportReason) {
            setSubmitError("Report reason is required.");
            return;
        }
        if (!reportedUser) {
            setSubmitError("User to be reported is required.");
            return;
        }
        const validationError = checkValidCredentials();
        if (validationError) {
            setSubmitError(validationError);
            return;
        }

        setSubmitError(""); // Clear any previous submit errors

        try {
            console.log(user._id);
            console.log(reportedUser);
            const response = await api.post("/auth/report", {
                reportedID: reportedUser._id,
                reportedFirstName: reportedUser.firstName,
                reportedMiddleName: reportedUser.middleName,
                reportedLastName: reportedUser.lastName,
                reason: reportReason
            });
            if (response) {
                alert("Submitted successfully!");
                return response.data;
            }
        } catch (error) {
            if (error.response) {
                console.log("Error response status: ", error.response.status);
                setSubmitError("An error has occurred while submitting.");
            } else {
                console.error("Error message: ", error.message);
                setSubmitError("A network error has occurred.");
            }
        }
    };

    return (
        <div>
            <p>Logged in as: {user && `${user.firstName} ${user.lastName} - ${user.email}`}</p> 
            <h1>Report Page</h1>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <label>Report User:</label>
            <select value={dropdownUser} onChange={handleDropdownChange}>
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
                    <br />
                    <textarea
                        value={reportReason}
                        onChange={handleTextChange}
                        rows="4"
                        cols="50"
                        placeholder="State your reasons here..."
                    />
                </div>
                <button type="submit">Submit</button>
                <br />
                {submitError && <p className="error">{submitError}</p>}
            </form>
        </div>
    );
}