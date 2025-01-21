import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import {jwtDecode} from "jwt-decode";
import './Report.css';
import { toast } from "sonner";

export default function Report() {
    const [user, setUser] = useState(null);
    const [reportReason, setReportReason] = useState(""); // State variable for text input
    const [errorMessage, setErrorMessage] = useState("");
    const [submitError, setSubmitError] = useState(""); // State variable for submit error

    // Fetch user data
    useEffect(() => {
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
        fetchUserData();
        setErrorMessage(''); // Clear any previous error messages
    }, []); // Runs only once after the initial render

    const handleTextChange = (event) => {
        setReportReason(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        if (!reportReason) {
            setSubmitError("Report reason is required.");
            return;
        }

        setSubmitError(""); // Clear any previous submit errors

        try {
            console.log(user._id);
            const response = await api.post("/report", {
                userId: user._id,
                reason: reportReason
            });
            if (response) {
                toast.success("Submitted successfully!");
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
        <div className="report-container">
            <p className="report-logged-in">Logged in as: {user && `${user.firstName} ${user.lastName} - ${user.email}`}</p> 
            <h1 className="report-header">Report Page</h1>
            {errorMessage && <p className="report-error">{errorMessage}</p>}
            <form className="report-form" onSubmit={handleSubmit}>
                <div className="report-reason-container">
                    <label className="report-label">Report Reason:</label>
                    <br />
                    <textarea
                        className="report-textarea"
                        value={reportReason}
                        onChange={handleTextChange}
                        rows="4"
                        cols="50"
                        placeholder="State your reasons here..."
                    />
                </div>
                <button className="report-submit-button" type="submit">Submit</button>
                <br />
                {submitError && <p className="report-error">{submitError}</p>}
            </form>
        </div>
    );
}
