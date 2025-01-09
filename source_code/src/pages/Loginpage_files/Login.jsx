import "./Login.css";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    console.log(email);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("test, dapat pumapasok dito");
    fetch("http://localhost:3000/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    }).then((res) => {
      if (res.ok) {
        alert("Login successful!");
        return res.json();
      }
      else if(response.status === 401) {
        alert("Invalid username and password!");
        throw new Error("Invalid credentials");
      } else {
        throw new Error("An error has occurred while signing in.");
      }
    }).catch((error) => {
      console.error("Error: ", error);
    })
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
            <div className="login-container">
              
            </div>
              
              <div className="card-login-page">
                <div className="rectangle-login-page"/>
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
                  <span id="errorMessage" className="error"></span>
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
