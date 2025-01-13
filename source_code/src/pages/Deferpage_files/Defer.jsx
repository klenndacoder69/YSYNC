import { useEffect, useState } from "react";
import api from "../../api/axios.js";

export default function Defer() {
    const [trainee, setTrainee] = useState(null); // Change to null to handle object
    const [user, setUser] = useState(null);
    const [deferReason, setDeferReason] = useState(""); // State variable for text input
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true); // State to track loading status
    const [submitError, setSubmitError] = useState(""); // State variable for submit error

    // Fetch trainee and user data
    useEffect(() => {
        const fetchTraineeData = async () => {
            try {
                // Fetching trainee data
                const traineeResponse = await api.get('trainees/6784d4cee03539058e15680f');
                setTrainee(traineeResponse.data);
                console.log("Trainee data:", traineeResponse.data);

                // Fetching user data once trainee is fetched
                const userResponse = await api.get(`users/${traineeResponse.data.userId}`);
                setUser(userResponse.data);
                console.log("User data:", userResponse.data);
            } catch (error) {
                setErrorMessage("Failed to fetch data.");
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false); // Set loading to false after the requests finish
            }
        };

        fetchTraineeData();
    }, []); // Runs only once after the initial render

    const handleTextChange = (event) => {
        setDeferReason(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!deferReason) {
            setSubmitError("Defer reason is required.");
            alert("Defer reason is required.");
            return;
        }
        console.log("Submit button clicked");
        console.log("Defer reason:", deferReason);
        setSubmitError(""); // Clear any previous submit errors

        try {
            const response = await api.post("/auth/defer", {
                userId: trainee.userId,
                reason: deferReason
            });
            if (response.status === 200) {
                alert("Submitted successfully!");
                return response.data;
            }
        } catch (error) {
            if (error.response) {
                console.log("Error response status: ", error.response.status);
                if (error.response.status === 401) {
                    setErrorMessage("Unauthorized access.");
                } else if (error.response.status === 404) {
                    setErrorMessage("Endpoint not found.");
                } else {
                    setErrorMessage("An error has occurred while submitting.");
                }
            } else {
                console.error("Error message: ", error.message);
                setErrorMessage("A network error has occurred.");
            }
        }
    };

    return (
        <div>
            <h1>Defer Page</h1>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {isLoading && <p>Loading...</p>}
            {trainee && (
                <div>
                    <h2>Trainee Info</h2>
                    <p>ID: {trainee._id}</p>
                    {trainee.userId && <p>UserID: {trainee.userId}</p>}
                </div>
            )}
            {user && (
                <div>
                    <h2>User Info</h2>
                    <p>ID: {user._id}</p>
                    <p>Email: {user.email}</p>
                    <p>First Name: {user.firstName}</p>
                    <p>Last Name: {user.lastName}</p>
                    <p>Middle Name: {user.middleName}</p>
                </div>
            )}
            <div>
                <h2>Defer Reason</h2>
                <textarea
                    value={deferReason}
                    onChange={handleTextChange}
                    rows="10"
                    cols="50"
                    placeholder="State your reasons here..."
                />
                {submitError && <p className="error">{submitError}</p>}
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}