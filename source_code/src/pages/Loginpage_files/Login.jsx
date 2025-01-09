import "./Login.css";
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  useEffect(() => {
    setErrorMessage('')
  }, [email,password]);

  // regex for accepting only upmails
  const isValidEmail = (email) => {
    const upEmailRegex = /^[a-zA-Z0-9._%+-]+@up\.edu\.ph$/;
    return upEmailRegex.test(email);
  };

  const checkValidCredentials = () => {
    if (!isValidEmail(email)) {
      return "Please enter a valid @up.edu.ph email address.";
    }
    return null; 
  };


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // check if fields are valid
    const error = checkValidCredentials();
    if (error) {
      setErrorMessage(error); 
      return; 
    }

    setErrorMessage("");

    // Proceed with the fetch request if fields are valid
    try{
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      console.log("Response body is: ", res.status)
      if (res.ok) {
        alert("Login successful!");
        return await res.json();
      } else if (res.status === 401) {
        setErrorMessage("Invalid email or password.");
      } else {
        setErrorMessage("An error has occurred while signing in.");
      }
      return;
    } catch (error) {
      console.error("Error: ", error);
      throw new Error(error);
    }
  }
     
  return (
    <>
      <div className="login-page">
        <div className="bg">
          <div className="login-main-content">
            <div className="logo-text-container">
              <img
                src="./assets/YSES Logo.png"
                className="logo-login-page"
                alt="YSES Logo"
              />
              <div className="text-login-page">
                <h1>YSYNC</h1>
                <p>
                  Streamlined Platform for YSES
                  <br />
                  Trainees' Application Process
                </p>
              </div>
            </div>
            <div className="login-container"></div>

            <div className="card-login-page">
              <div className="rectangle-login-page" />
              <h1>Welcome back, Trainee!</h1>
              <form id="email-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={handleEmailChange}
                  id="email-login-page"
                  required
                />
                <br />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  id="password-login-page"
                  required
                />
                <br />
                {errorMessage && <span id="errorMessage" className="error">{errorMessage}</span>}
                <br />
                <input
                  type="submit"
                  value="Login with UPmail"
                  id="submit-btn-login-page"
                />
              </form>
              <p>
                Having trouble? <a href="mailto:info@yses.org">Contact us</a>
              </p>
            </div>
            <div className="contact-login-page">
              <a href="mailto:info@yses.org">
                <img src="./assets/Email Icon.png" alt="Email Icon" />
              </a>
              <a href="https://www.yses.org/">
                <img src="./assets/YSES Icon.png" alt="YSES Icon" />
              </a>
              <a href="https://www.facebook.com/YSES2005/">
                <img src="./assets/Facebook Icon.png" alt="Facebook Icon" />
              </a>
              <a href="https://www.instagram.com/yses2005/">
                <img src="./assets/Instagram Icon.png" alt="Instagram Icon" />
              </a>
              <a href="https://x.com/yses2005">
                <img src="./assets/X Icon.png" alt="X Icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
