import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "sonner";

export default function Migrate() {
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [orgBatch, setOrgBatch] = useState("");
    const handleMigrate = async (event) => {
        try{
            event.preventDefault();
            const response = await api.post(`/migrate/${userId}`, {orgBatch});
            console.log(response);
            toast.success("User migrated successfully!");
        } catch (error) {
            if(error.response) {
                console.error("Error response status: ", error.response.status);
            }
            else{
                console.error("A network error has occurred.");
            }
        }

    }

    useEffect(() => {
        const decodedToken = jwtDecode(sessionStorage.getItem("accessToken"));
        setUserId(decodedToken.id);
    }, [])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await api.get(`users/${userId}`);
                if (userResponse) {
                    setUser(userResponse.data);
                    console.log(userResponse)
                }
            } catch (error) {
                setErrorMessage("Failed to fetch data.");
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [userId])

    if (loading) {
        return <p>Loading...</p>;
    }
    
    return (
    <div>
        Migrate this user?
        <p>Current user: {user ? `${user.firstName} ${user.middleName} ${user.lastName}` : ""}</p>
        <p>Current email: {user ? user.email : ""}</p>
        <p>Current type: {user ? user.userType : ""}</p>
        <label>
            Enter orgbatch:
            <input type="text" placeholder="HASH" value={orgBatch} onChange={() => {
                setOrgBatch(event.target.value);
            }}></input>
        </label>
        <br/>
        <br/>
        <button type="submit" disabled={user ? (user.userType === "trainee" ? false : true) : true} onClick={(event) => {
            handleMigrate(event);
        }}>Migrate</button>
    </div>
    )
}