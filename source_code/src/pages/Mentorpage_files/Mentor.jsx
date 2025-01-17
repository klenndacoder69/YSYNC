import CardMentor from "./CardMentor.jsx"
import "./Mentor.css"
import api from "../../api/axios.js"
import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const fetchMentors = async () => {
    try {
      const response = await api.get('/getMentors');
      console.log('Mentors:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching mentors:', error.response ? error.response.data : error.message);
      throw error;
    }
};

const fetchTopMentors = async (userId) => {
    try {
        const response = await api.post(`/getMentorRecommendations/${userId}`);
        console.log('TOP MENTORS:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching mentors:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export default function Mentor(){
    const [mentors, setMentors] = useState([]); 
    const [topMentors, setTopMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const decodedToken = jwtDecode(sessionStorage.getItem("accessToken"));
        console.log(decodedToken);
        setUserId(decodedToken.id);
    }, []); 

    useEffect(() => {
        const decodedToken = jwtDecode(sessionStorage.getItem("accessToken"));
        console.log(decodedToken)
        setUserId(decodedToken.id);
        console.log("The user id is: ", userId)
        const loadMentors = async () => {
            
            try {
                const fetchedMentors = await fetchMentors();
                setMentors(fetchedMentors);
                const fetchedTopMentors = await fetchTopMentors(userId);
                setTopMentors(fetchedTopMentors);
            } catch (err) {
                console.error('Error loading mentors:', err);
            } finally {
                setLoading(false);
            }
        };       

        loadMentors();
    }, [userId]);
 
    if (loading) {
        return <div>Loading mentors...</div>;
    }


    return(
        <>  
            <div className="mentor-page">

                <div className="mentor-main">
                    <div className="mentor-top-picks">
                        <div className="mentor-top-components">
                            {topMentors.map((mentor) => (
                                <CardMentor
                                    key = {mentor.userId}
                                    image = {mentor.userId.image}
                                    name={`${mentor.userId.firstName} ${mentor.userId.lastName}`}
                                    batch={mentor.orgBatch}
                                    dept={mentor.department}
                                    bio={mentor.whyYouShouldChooseMe}
                                    exp={mentor.whatToExpect}
                                    interests={mentor.traineeId.interests.join(", ")}
                                />
                            ))}
                        </div>

                        <div className="mentor-top-text">
                        ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ TOP RECOMMENDED MENTORS FOR YOU ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
                        </div>
                    </div>
                </div>

                <div className="other-mentors-container">
                    <div className="other-mentors">
                            {mentors.map((mentor) => (
                                <CardMentor
                                    key = {mentor.userId}
                                    image = {mentor.userId.image}
                                    name={`${mentor.userId.firstName} ${mentor.userId.lastName}`}
                                    batch={mentor.orgBatch}
                                    dept={mentor.department}
                                    bio={mentor.whyYouShouldChooseMe}
                                    exp={mentor.whatToExpect}
                                    interests={mentor.traineeId.interests.join(", ")}
                                />
                            ))}
                    </div>
                </div>

            </div>
        </>
    )
}