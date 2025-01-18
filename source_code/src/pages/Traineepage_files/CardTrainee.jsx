import React, { useState } from "react";
import "./CardTrainee.css";

export default function CardTrainee({ image, name, batch, nickname, about, interests }) {
  const [isFlipped, setIsFlipped] = useState(false); 

  const handleCardClick = () => {
    setIsFlipped(!isFlipped); //change the flip case
  };

  return (
    <div className="trainee-card-maincontainer">
        {/* the div below will get an additional className called trainee-card-flipped if the onClick happens which will activate the rotation for that className */}
        <div className={`trainee-card ${isFlipped ? "trainee-card-flipped" : ""}`} onClick={handleCardClick}>
        
            <div className="trainee-card-front">
                <div className="trainee-card-image-wrapper">
                    <img src={image} alt={`${name}'s profile`} className="trainee-card-image"/>
                </div>
            
                <div className="trainee-card-front-info-wrapper">
                    <h1 className="trainee-card-name">{name}</h1>
                    <p className="trainee-card-batch">Batch {batch}</p>
                    <p className="trainee-card-dept">{nickname}</p>
                </div>
            </div>

            <div className="trainee-card-back">
                <h2 className="trainee-card-bio">ABOUT:<br/><span style={{ fontWeight: "normal" }}>{about}</span></h2>
                <h2 className="trainee-card-interests">INTERESTS: <br/><span style={{ fontWeight: "normal" }}>{interests}</span></h2>
            </div>

        </div>
    </div>
  );
}
