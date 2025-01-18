import "./Login.css";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthProvider.jsx";
import api from "../../api/axios.js";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const { auth, setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

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

    try {
      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });
      if (response) {
        alert("Login successful!");

        // save access token and role in memory
        const accessToken = response?.data?.accessToken;
        const role = response?.data?.role;

        setAuth({ email, password, accessToken, role });
        // for now let us store the access token in the session storage TODO:
        sessionStorage.setItem("accessToken", accessToken);
        if (role === "trainee") {
          navigate("/trainee/dashboard");
        } else if (role === "residentMember") {
          navigate("/resmem/dashboard");
        } else if (role === "admin") {
          navigate("/admin/acc-info");
        } else {
          // How did it go here? Well, for some reason, they got a response with an invalid role
          console.log("Invalid role: ", role);
          throw new Error("Invalid role.");
        }
      }
    } catch (error) {
      if (error.response) {
        console.log("Error response status: ", error.response.status);
        console.log(password);
        if (error.response.status === 401) {
          setErrorMessage("Invalid email or password.");
        } else {  
          setErrorMessage("An error has occurred while signing in.");
        }
      } else {
        console.error("Error message: ", error.message);
        setErrorMessage("No response from the server.");
      }
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="bg-login">
          <div className="login-main-content">
            <div className="logo-text-container-login">
              <div className="logo-login-page-container">
                <img
                  src="/assets/YSYNC.png"
                  className="logo-login-page"
                  alt="YSES Logo"
                />
                <p>
                  Streamlined Platform for YSES
                  <br />
                  Trainees' Application Process
                </p>
              </div>

              <div className="card-login-page">
                <div className="rectangle-login-page" />
                <h1>Welcome back!</h1>
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
                  {errorMessage && (
                    <span id="errorMessage" className="error">
                      {errorMessage}
                    </span>
                  )}
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
                  <p>Don't have an account? <Link to="/register">Register here.</Link></p>
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
                    <img
                      src="./assets/Instagram Icon.png"
                      alt="Instagram Icon"
                    />
                  </a>
                  <a href="https://x.com/yses2005">
                    <img src="./assets/X Icon.png" alt="X Icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
