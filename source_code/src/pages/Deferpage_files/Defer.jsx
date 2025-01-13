import { useEffect, useState } from "react";
import api from "../../api/axios.js";

export default function Defer() {
    const [trainee, setTrainee] = useState(null); 
    const [user, setUser] = useState(null); 
    const [deferReason, setDeferReason] = useState(""); // State variable for text input
    
    const [errorMessage, setErrorMessage] = useState("");
    const [submitError, setSubmitError] = useState(""); // State variable for submit error

    // Fetch trainee and user data
    useEffect(() => {
        const fetchTraineeData = async () => {
            try {
                // Fetching trainee data
                const traineeResponse = await api.get('trainees/6784d4cee03539058e15680f');
                setTrainee(traineeResponse.data);

                // Fetching user data
                const userResponse = await api.get(`users/${traineeResponse.data.userId}`);
                setUser(userResponse.data);

            } catch (error) {
                setErrorMessage("Failed to fetch data.");
                console.error("Error fetching data:", error);
            } 
        };
        fetchTraineeData();
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
            const response = await api.post("/auth/defer", {
                email: user.email,
                reason: deferReason
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
            <h1>Defer Page</h1>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <div>
                <h2>Defer Reason</h2>
                <textarea
                    value={deferReason}
                    onChange={handleTextChange}
                    rows="10"
                    cols="50"
                    placeholder="State your reasons here..."
                />
            </div>
            <button onClick={handleSubmit}>Submit</button>
            <br></br>
            {submitError && <p className="error">{submitError}</p>}
        </div>
    );
}