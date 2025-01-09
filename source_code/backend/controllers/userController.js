import User from "../models/userSchema.js";


const userSignIn = async (req, res) => {
    try{
        console.log("This is the request body", req.body);
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials."});
        }

        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials."});
        }   

        res.status(200).json({ message: "Login successful"});
    } catch (error) {
        res.status(500).json({ error: "An error has occurred while signing in."});
    }
}

export {
    userSignIn
}