import CardMentor from "./CardMentor.jsx"

const mentors = [
    {id: 1, image: "/assets/profile_face.png", name: "jessica soho", batch: "python", dept: "Scholastic", bio: "BIO GOES HERE", exp: "EXPERTISE GO HERE", interests: "INTERESTS GO HERE"},
    {id: 1, image: "/assets/profile-pic-2.png", name: "jessica soho", batch: "python", dept: "Scholastic", bio: "BIO GOES HERE", exp: "EXPERTISE GO HERE", interests: "INTERESTS GO HERE"},
    {id: 1, image: "/assets/profile.jpg", name: "jessica soho", batch: "python", dept: "Scholastic", bio: "BIO GOES HERE", exp: "EXPERTISE GO HERE", interests: "INTERESTS GO HERE"},
]

export default function Mentor(){
    return(
        <>  
            <div style={{backgroundColor: '#132B41'}}>
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
            
        </>
    )
}