import { useState } from "react";


export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); 

    // Form validation functions: 
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleMiddleNameChange = (event) => {
        setMiddleName(event.target.value);
    }

    // Functions in handling up mail:
    const isValidEmail = (email) => {
        const upEmailRegex = /^[a-zA-Z0-9._%+-]+@up\.edu\.ph$/;
        return upEmailRegex.test(email);
    }

    const checkValidCredentials = () => {
        if (!isValidEmail(email)) {
            return "Please enter a valid @up.edu.ph email address.";
        }
        return null;
    }

    // Handle submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const error = checkValidCredentials();
        if (error) {
            setErrorMessage(error); 
            return;
        }
        setErrorMessage("");
        const user = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName
        }

        fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }).then((res) => {
            if (res.ok) {
                alert("Registration successful!");
            }
            else if (res.status === 400) {
                alert("User already exists.");
            }
            else if (res.status === 500) {
                alert("An error has occurred while registering.");
            }
        }).catch((err) => {
            alert("Failed to respond to the server.");
            throw new Error(err);
        })
    }

    return (
        <>
            <form className="register-main-content" onSubmit={handleSubmit}>
                <label>First Name:
                    <input type="text" name="firstName" onChange={handleFirstNameChange} required/>
                </label>
                <br />
                <label>Middle Name:
                    <input type="text" name="middleName" onChange={handleMiddleNameChange} />
                </label>
                <br />
                <label>Last Name:
                    <input type="text" name="lastName" onChange={handleLastNameChange} required/>
                </label>
                <br />
                <label>Email:
                    <input type="email" name="email" onChange={handleEmailChange} required/>
                </label>
                <br/>
                {errorMessage && 
                <>
                    <span className="error">{errorMessage}</span>
                    <br/>
                </>
                }
                <label>Password:
                    <input type="password" name="password" onChange={handlePasswordChange} required/>
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        </>
    )
}