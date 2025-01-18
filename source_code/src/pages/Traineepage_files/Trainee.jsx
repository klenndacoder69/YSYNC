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
    console.error("Error fetching trainees:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export default function Trainee() {
  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [animate, setAnimate] = useState(false);
  const [background, setBackground] = useState(false);
  const [selectedTrainee, setSelectedTrainee] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setBackground(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const decodedToken = jwtDecode(sessionStorage.getItem("accessToken"));
    setUserId(decodedToken.id);
  }, []);

  useEffect(() => {
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

  const handleCardClick = (trainee) => {
    setSelectedTrainee(trainee);
  };

  if (loading) {
    return <div>Loading trainees...</div>;
  }

  return (
    <>
      <div className="trainee-page">
        <div className="trainee-main-bg-size">
          <div className={`${background ? "trainee-main-bg" : ""}`}>
            {selectedTrainee && (
                <div className={`${background ? "trainee-top-card" : ""}`}>
                  <div className="trainee-details">
                    <div className="trainee-details-content">
                      <h2>ABOUT:</h2>
                      <p>{selectedTrainee.userId.about}</p>
                      <h2>INTERESTS:</h2>
                      <p>{selectedTrainee.interests.join(", ")}</p>
                    </div>
                    <div className="selected-profile-picture">
                      <img src={selectedTrainee.userId.image} className="selected-profile" alt="Selected Trainee" />
                    </div>
                  </div>
                </div>
              
            )}
          </div>
          <div className={`other-trainees-container ${animate ? "slideDown" : ""}`}>
              <div className="other-trainees">
                {trainees.map((trainee) => (
                  <div key={trainee.userId} onClick={() => handleCardClick(trainee)}>
                    <CardTrainee
                      image={trainee.userId.image}
                      name={`${trainee.userId.firstName} ${trainee.userId.lastName}`}
                      batch={trainee.univBatch}
                      nickname={trainee.userId.nickname}
                      about={trainee.userId.about}
                      interests={trainee.interests.join(", ")}
                    />
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    </>
  );
}