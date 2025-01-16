import CardMentor from "./CardMentor.jsx"

const mentors = [
    {id: 1, image: "/assets/profile_face.png", name: "jessica soho", batch: "python", dept: "Scholastic", bio: "ako si jessica hehe", exp: "sigma", interests: "test muna"},
    {id: 2, image: "/assets/profile-pic-2.png", name: "jessica soho", batch: "python", dept: "Scholastic", bio: "ako si jessica hehe", exp: "sigma", interests: "test muna"},
    {id: 3, image: "/assets/profile.jpg", name: "jessica soho", batch: "python", dept: "Scholastic", bio: "ako si jessica hehe", exp: "sigma", interests: "test muna"}
]

export default function Mentor(){
    return(
        <>  
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
        </>
    )
}