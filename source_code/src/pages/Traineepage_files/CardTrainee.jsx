import React, { useState } from "react";
import "./CardTrainee.css";

export default function CardTrainee({ image, name, batch, nickname, about, interests }) {
  const [isFlipped, setIsFlipped] = useState(false); 

  const handleCardClick = () => {
    setIsFlipped(!isFlipped); //change the flip case
  };

  return (
    <div className="mentor-card-maincontainer">
        {/* the div below will get an additional className called mentor-card-flipped if the onClick happens which will activate the rotation for that className */}
        <div className={`mentor-card ${isFlipped ? "mentor-card-flipped" : ""}`} onClick={handleCardClick}>
        
            <div className="mentor-card-front">
                <div className="mentor-card-image-wrapper">
                    <img src={image} alt={`${name}'s profile`} className="mentor-card-image"/>
                </div>
            
                <div className="mentor-card-front-info-wrapper">
                    <h1 className="mentor-card-name">{name}</h1>
                    <p className="mentor-card-batch">Batch {batch}</p>
                    <p className="mentor-card-dept">{nickname}</p>
                </div>
            </div>

            <div className="mentor-card-back">
                <h2 className="mentor-card-bio">ABOUT:<br/><span style={{ fontWeight: "normal" }}>{about}</span></h2>
                <h2 className="mentor-card-interests">INTERESTS: <br/><span style={{ fontWeight: "normal" }}>{interests}</span></h2>
            </div>

        </div>
    </div>
  );
}
