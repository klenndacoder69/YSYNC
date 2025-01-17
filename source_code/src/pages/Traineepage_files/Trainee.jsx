import CardTrainee from "./CardTrainee.jsx";
import "./Trainee.css";
import api from "../../api/axios.js";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const fetchTrainees = async () => {
  try {
    const response = await api.get("/getAllTrainees");
    console.log("Trainees:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching trainees:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// const fetchTopMentors = async (userId) => {
//     try {
//         const response = await api.post(`/getMentorRecommendations/${userId}`);
//         console.log('TOP MENTORS:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching mentors:', error.response ? error.response.data : error.message);
//         throw error;
//     }
// };

export default function Trainee() {
  const [trainees, setTrainees] = useState([]);
  // const [topMentors, setTopMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [animate, setAnimate] = useState(false);
  const [background, setBackground] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true); // callback func so setAnimate will be set to true after 1000ms
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBackground(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const decodedToken = jwtDecode(sessionStorage.getItem("accessToken"));
    console.log(decodedToken);
    setUserId(decodedToken.id);
  }, []);

  useEffect(() => {
    const decodedToken = jwtDecode(sessionStorage.getItem("accessToken"));
    console.log(decodedToken);
    setUserId(decodedToken.id);
    console.log("The user id is: ", userId);
    const loadTrainees = async () => {
      try {
        const fetchedTrainees = await fetchTrainees();
        setTrainees(fetchedTrainees);
      } catch (err) {
        console.error("Error loading trainees:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTrainees();
  }, [userId]);

  if (loading) {
    return <div>Loading trainees...</div>;
  }

  return (
    <>
      <div className="mentor-page">
        <div className="mentor-main-bg-size">
          {" "}
          {/* serves as the size for the top div for top 3 mentors */}
          <div className={`${background ? "mentor-main-bg" : ""}`}>
            {" "}
            {/* adds a color bg so when bounce occurs you wont see white on top*/}
            <div
              className={`other-mentors-container ${
                animate ? "slideDown" : ""
              }`}
            >
              {/* <div className="other-mentors-container"> */}
              <div className="other-mentors">
                {trainees.map((trainee) => (
                  <CardTrainee
                    key={trainee.userId}
                    image={trainee.userId.image}
                    name={`${trainee.userId.firstName} ${trainee.userId.lastName}`}
                    batch={trainee.univBatch}
                    nickname={trainee.userId.nickname}
                    about={trainee.userId.about}
                    interests={trainee.interests.join(", ")}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
