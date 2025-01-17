import CardMentor from "./CardMentor.jsx"
import "./Mentor.css"

const mentors = [
    {id: 1, image: "/assets/Snorlax.png", name: "POKEMON, SNORLAX B.", batch: "Hash", dept: "Scholastics", bio: "BIO GOES HERE", exp: "EXPERTISE GO HERE", interests: "INTERESTS GO HERE"},
    {id: 1, image: "/assets/Snorlax.png", name: "POKEMON, SNORLAX B.", batch: "Hash", dept: "Scholastics", bio: "BIO GOES HERE", exp: "EXPERTISE GO HERE", interests: "INTERESTS GO HERE"},
    {id: 1, image: "/assets/Snorlax.png", name: "POKEMON, SNORLAX B.", batch: "Hash", dept: "Scholastics", bio: "BIO GOES HERE", exp: "EXPERTISE GO HERE", interests: "INTERESTS GO HERE"},
    {id: 1, image: "/assets/Snorlax.png", name: "POKEMON, SNORLAX B.", batch: "Hash", dept: "Scholastics", bio: "BIO GOES HERE", exp: "EXPERTISE GO HERE", interests: "INTERESTS GO HERE"},
    {id: 1, image: "/assets/Snorlax.png", name: "POKEMON, SNORLAX B.", batch: "Hash", dept: "Scholastics", bio: "BIO GOES HERE", exp: "EXPERTISE GO HERE", interests: "INTERESTS GO HERE"},
    {id: 1, image: "/assets/Snorlax.png", name: "POKEMON, SNORLAX B.", batch: "Hash", dept: "Scholastics", bio: "BIO GOES HERE", exp: "EXPERTISE GO HERE", interests: "INTERESTS GO HERE"},
    {id: 1, image: "/assets/Snorlax.png", name: "POKEMON, SNORLAX B.", batch: "Hash", dept: "Scholastics", bio: "BIO GOES HERE", exp: "EXPERTISE GO HERE", interests: "INTERESTS GO HERE"},
    {id: 1, image: "/assets/Snorlax.png", name: "POKEMON, SNORLAX B.", batch: "Hash", dept: "Scholastics", bio: "BIO GOES HERE", exp: "EXPERTISE GO HERE", interests: "INTERESTS GO HERE"},
    {id: 1, image: "/assets/Snorlax.png", name: "POKEMON, SNORLAX B.", batch: "Hash", dept: "Scholastics", bio: "BIO GOES HERE", exp: "EXPERTISE GO HERE", interests: "INTERESTS GO HERE"},
    {id: 1, image: "/assets/Snorlax.png", name: "POKEMON, SNORLAX B.", batch: "Hash", dept: "Scholastics", bio: "BIO GOES HERE", exp: "EXPERTISE GO HERE", interests: "INTERESTS GO HERE"},
    {id: 1, image: "/assets/Snorlax.png", name: "POKEMON, SNORLAX B.", batch: "Hash", dept: "Scholastics", bio: "BIO GOES HERE", exp: "EXPERTISE GO HERE", interests: "INTERESTS GO HERE"},
    {id: 1, image: "/assets/Snorlax.png", name: "POKEMON, SNORLAX B.", batch: "Hash", dept: "Scholastics", bio: "BIO GOES HERE", exp: "EXPERTISE GO HERE", interests: "INTERESTS GO HERE"},
    {id: 1, image: "/assets/Snorlax.png", name: "POKEMON, SNORLAX B.", batch: "Hash", dept: "Scholastics", bio: "BIO GOES HERE", exp: "EXPERTISE GO HERE", interests: "INTERESTS GO HERE"},
    {id: 1, image: "/assets/Snorlax.png", name: "POKEMON, SNORLAX B.", batch: "Hash", dept: "Scholastics", bio: "BIO GOES HERE", exp: "EXPERTISE GO HERE", interests: "INTERESTS GO HERE"},
    {id: 1, image: "/assets/Snorlax.png", name: "POKEMON, SNORLAX B.", batch: "Hash", dept: "Scholastics", bio: "BIO GOES HERE", exp: "EXPERTISE GO HERE", interests: "INTERESTS GO HERE"},
    {id: 1, image: "/assets/Snorlax.png", name: "POKEMON, SNORLAX B.", batch: "Hash", dept: "Scholastics", bio: "BIO GOES HERE", exp: "EXPERTISE GO HERE", interests: "INTERESTS GO HERE"},
]

export default function Mentor(){
    return(
        <>  
            <div className="mentor-page">

                <div className="mentor-main">
                    <div className="mentor-top-picks">
                        <div className="mentor-top-components">
                            {mentors.slice(0, 3).map((mentor) => (
                                <CardMentor
                                    key={mentor.id}
                                    image={mentor.image}
                                    name={mentor.name}
                                    batch={mentor.batch}
                                    dept={mentor.dept}
                                    bio={mentor.bio}
                                    exp={mentor.exp}
                                    interests={mentor.interests}
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
                                    key = {mentor.id}
                                    image = {mentor.image}
                                    name = {mentor.name}
                                    batch = {mentor.batch}
                                    dept = {mentor.dept}
                                    bio = {mentor.bio}
                                    exp = {mentor.exp}
                                    interests = {mentor.interests}
                                />
                            ))}
                    </div>
                </div>

            </div>
        </>
    )
}