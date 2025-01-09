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

const userRegister = async (req, res) => {
    try{
        const { firstName, lastName, middleName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists."});
        }
        
        // we set userType to trainee (TODO: this will be changed later on)
        const user = new User({ firstName, lastName, middleName, email, password, userType: "trainee" });

        await user.save().then(() => {
            res.status(201).json({ message: "User registered successfully."});
        }).catch((err) => {
            res.status(500).json({ error: "An error has occured while registering the user."});
        });
    } catch (error) {
        res.status(500).json({ error: "An error has occured while registering the user."});
    }
}

export {
    userSignIn,
    userRegister
}