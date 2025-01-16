import "./CardMentor.css"

export default function CardMentor({ image, name, batch, dept, bio, exp, interests }){
    return(
        <>
            <div className="mentor-card-maincontainer">
                <div className="mentor-card">
                    <div className="mentor-card-front">
                        <div className="mentor-card-image-wrapper"> 
                            <img src={image} alt={`${name}'s profile`} className="mentor-card-image" />
                        </div>
                        <div className="mentor-card-front-info-wrapper">
                            <h1 className="mentor-card-name">{name}</h1>
                            <p className="mentor-card-batch">Batch {batch}</p>
                            <p className="mentor-card-dept">{dept} Department</p>
                        </div>
                    </div>

                    <div className="mentor-card-back">
                        <h2 className="mentor-card-bio">{bio}</h2>
                        <h2 className="mentor-card-exp">{exp}</h2>
                        <h2 className="mentor-card-interests">{interests}</h2>
                    </div>
                </div>
            </div>
        </>
    )
}