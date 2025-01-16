import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { jwtDecode } from "jwt-decode";

export default function Defer() {
    const [user, setUser] = useState(null);
    const [deferReason, setDeferReason] = useState(""); // State variable for text input
    const [errorMessage, setErrorMessage] = useState("");
    const [submitError, setSubmitError] = useState(""); // State variable for submit error

    const fetchUserData = async () => {
        try {
            const token = sessionStorage.getItem("accessToken");
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            const userResponse = await api.get(`users/${decodedToken.id}`);
            setUser(userResponse.data);
        } catch (error) {
            setErrorMessage("Failed to fetch data.");
            console.error("Error fetching data:", error);
        }
    };

    // Fetch user data
    useEffect(() => {
        fetchUserData();
        setErrorMessage(''); // Clear any previous error messages
    }, []); // Runs only once after the initial render

    const handleTextChange = (event) => {
        setDeferReason(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        if (!deferReason) {
            setSubmitError("Defer reason is required.");
            return;
        }

        setSubmitError(""); // Clear any previous submit errors

        try {
            console.log(user._id);
            const response = await api.post("/defer", {
                userId: user._id,
                reason: deferReason,
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
            <h1>Defer Page</h1>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Defer Reason:</label>
                    <br />
                    <textarea
                        value={deferReason}
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
