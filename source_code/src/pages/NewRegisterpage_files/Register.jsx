import React, { useEffect, useState } from "react";
import "./Register.css";
import api from "../../api/axios.js";
import logo from "/assets/logo.png";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formStep, setFormStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [univBatch, setUnivBatch] = useState(2005);
  const [orgBatch, setOrgBatch] = useState("");
  const [birthday, setBirthday] = useState(
    new Date().toISOString().split("T")[0]
  );
  const navigate = useNavigate();
  const [about, setAbout] = useState("");
  const [interests, setInterests] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    printVariables();
  }, [
    firstName,
    middleName,
    lastName,
    email,
    password,
    confirmPassword,
    univBatch,
    orgBatch,
    birthday,
    about,
    interests,
    nickname,
  ]);

  const printVariables = () => {
    console.log("First name:", firstName);
    console.log("Middle name:", middleName);
    console.log("Last name:", lastName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm password:", confirmPassword);
    console.log("Nickname:", nickname);
    console.log("Univ batch:", univBatch);
    console.log("Org batch:", orgBatch);
    console.log("Birthday:", birthday);
    console.log("About:", about);
    console.log("Interests:", interests);
  };

  useEffect(() => {
    if (firstName !== "" && lastName !== "") {
      setErrorMessage("");
    } else {
      setErrorMessage("First name and last name are required.");
    }
  }, [firstName, lastName]);

  useEffect(() => {
    if (email !== "") {
      if (!upEmailRegex.test(email)) {
        setErrorMessage("Please enter a valid UP email address.");
      } else {
        setErrorMessage("");
      }
    } else {
      setErrorMessage("Email is required.");
    }
  }, [email]);

  // check if password === confirmPassword
  useEffect(() => {
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
      } else {
        setErrorMessage("");
      }
    } else {
      setErrorMessage("Password is required.");
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (univBatch !== "") {
      if (typeof univBatch !== "number") {
        setErrorMessage("Univ batch must be a number.");
      } else {
        setErrorMessage("");
      }
    } else {
      setErrorMessage("Univ batch is required.");
    }
  }, [univBatch]);

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleMiddleName = (event) => {
    setMiddleName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const upEmailRegex = /^[a-zA-Z0-9._%+-]+@up\.edu\.ph$/;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleNickname = (event) => {
    setNickname(event.target.value);
  };

  const handleUnivBatch = (event) => {
    const univBatchValue = Number(event.target.value);
    if (isNaN(univBatchValue)) {
      setErrorMessage("Univ batch must be a number.");
    } else {
      setUnivBatch(univBatchValue);
    }
  };

  const handleOrgBatch = (event) => {
    setOrgBatch(event.target.value);
  };

  const handleBirthday = (event) => {
    const dateValue = new Date(event.target.value).toISOString().split("T")[0];
    setBirthday(dateValue);
  };

  const handleAbout = (event) => {
    setAbout(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    setInterests((prevInterests) => {
      if (checked) {
        // Add the interest if it's checked and not already in the array
        return [...prevInterests, value];
      } else {
        // Remove the interest if it's unchecked
        return prevInterests.filter((interest) => interest !== value);
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = api.post("/auth/register", {
        firstName,
        middleName,
        lastName,
        email,
        password,
        nickname,
        univBatch,
        orgBatch,
        birthday,
        about,
        interests,
      });
      if (response){
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      if(error.response){
        console.log("Error response status: ", error.response.status);
      }
      else{
        console.error("A network error has occurred.")
      }
    }
  };
  const handleNext = () => {
    setFormStep(formStep + 1);
  };

  const handlePrev = () => {
    setFormStep(formStep - 1);
  };

  return (
    <div className="regis-body">
      <div className="regis-container">
        <div className="regis-left-panel">
          <img src={logo} className="regis-logo" alt="Logo" />
          Streamlined Platform for YSES
          <br />
          Trainees' Application Process
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="regis-left-contact">
            Having trouble? <a href="mailto:info@yses.org">Contact us</a>
          </div>
        </div>

        <div className="regis-right-panel">
          {formStep === 1 && (
            <div className="regis-form1">
              <h2>Register</h2>
              <br />
              <form>
                <div className="regis-form-group">
                  <h3>FIRST NAME</h3>
                  <input
                    type="text"
                    id="first-name"
                    name="first-name"
                    placeholder="Enter Your First Name"
                    value={firstName}
                    onChange={handleFirstName}
                    required
                  />

                  <h3>MIDDLE NAME</h3>
                  <input
                    type="text"
                    id="middle-name"
                    name="middle-name"
                    placeholder="Enter Your Middle Name"
                    value={middleName}
                    onChange={handleMiddleName}
                    required
                  />

                  <h3>LAST NAME</h3>
                  <input
                    type="text"
                    id="last-name"
                    name="last-name"
                    placeholder="Enter Your Last Name"
                    value={lastName}
                    onChange={handleLastName}
                    required
                  />

                  <h3>EMAIL</h3>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />

                  <h3>Password</h3>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />

                  <h3>Confirm Password</h3>
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="Confirm Your Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />

                  {errorMessage && (
                    <p style={{ color: "red" }}>{errorMessage}</p>
                  )}
                  <div className="regis-navigation-buttons">
                    <label></label>
                    {errorMessage ? (
                      <button
                        type="button"
                        className="regis-btn"
                        onClick={handleNext}
                        disabled
                        style={{ color: "red" }}
                      >
                        NEXT →
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="regis-btn"
                        onClick={handleNext}
                      >
                        NEXT →
                      </button>
                    )}
                  </div>

                  <br />
                  <br />
                  <br />
                </div>
              </form>
            </div>
          )}

          {formStep === 2 && (
            <div id="regis-form2">
              <h2>Register</h2>
              <br />
              <div className="regis-form-group">
                <h3>Nickname</h3>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  placeholder="Enter Your Nickname"
                  onChange={handleNickname}
                  value={nickname}
                />

                <h3>University Batch</h3>
                <input
                  type="text"
                  id="university-batch"
                  name="university-batch"
                  placeholder="Enter Your University Batch"
                  onChange={handleUnivBatch}
                  value={univBatch}
                  required
                />

                <h3>Organization Batch</h3>
                <input
                  type="text"
                  id="organization-batch"
                  name="organization-batch"
                  placeholder="Type '-' if Trainee"
                  onChange={handleOrgBatch}
                  value={orgBatch}
                  required
                />

                <h3>Birthday</h3>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  placeholder="Enter Your Birth Date"
                  onChange={handleBirthday}
                  value={birthday}
                  required
                />

                <h3>Tell us more about yourself</h3>
                <input
                  type="text"
                  id="about"
                  name="about"
                  placeholder="Enter your details"
                  onChange={handleAbout}
                  value={about}
                  required
                ></input>

                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <div className="regis-navigation-buttons">
                  <button
                    type="button"
                    className="regis-btn"
                    onClick={handlePrev}
                  >
                    ← PREVIOUS
                  </button>
                  {errorMessage ? (
                    <button
                      type="button"
                      className="regis-btn"
                      onClick={handleNext}
                      disabled
                      style={{ color: "red" }}
                    >
                      NEXT →
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="regis-btn"
                      onClick={handleNext}
                    >
                      NEXT →
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {formStep === 3 && (
            <div id="regis-form3">
              <h2>Register</h2>
              <br />
              <div className="regis-form-group">
                {/* Personal Details Section */}
                <div className="regis-p3-info">
                  <h3>Personal Details</h3>
                  <p>Choose 1-5 options</p>
                </div>
                <hr className="regis-line" />
                <div className="regis-checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      value="UI/UX Design"
                      checked={interests.includes("UI/UX Design")}
                      onChange={handleCheckboxChange}
                    />
                    UI/UX Design
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Digital Media and Content Creation"
                      checked={interests.includes(
                        "Digital Media and Content Creation"
                      )}
                      onChange={handleCheckboxChange}
                    />
                    Digital Media and Content Creation
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Technical Writing and Documentation"
                      checked={interests.includes(
                        "Technical Writing and Documentation"
                      )}
                      onChange={handleCheckboxChange}
                    />
                    Technical Writing and Documentation
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Project Management"
                      checked={interests.includes("Project Management")}
                      onChange={handleCheckboxChange}
                    />
                    Project Management
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Startup"
                      checked={interests.includes("Startup")}
                      onChange={handleCheckboxChange}
                    />
                    Startup
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Entrepreneurship Community"
                      checked={interests.includes("Entrepreneurship Community")}
                      onChange={handleCheckboxChange}
                    />
                    Entrepreneurship Community
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Engagement and Teaching"
                      checked={interests.includes("Engagement and Teaching")}
                      onChange={handleCheckboxChange}
                    />
                    Engagement and Teaching
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Hackathons and Coding Competitions"
                      checked={interests.includes(
                        "Hackathons and Coding Competitions"
                      )}
                      onChange={handleCheckboxChange}
                    />
                    Hackathons and Coding Competitions
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Game Art and Design"
                      checked={interests.includes("Game Art and Design")}
                      onChange={handleCheckboxChange}
                    />
                    Game Art and Design
                  </label>
                </div>

                {/* Academic Details Section */}
                <div className="regis-p3-info">
                  <h3>Academic Details</h3>
                  <p>Choose 1-5 options</p>
                </div>
                <hr className="regis-line" />
                <div className="regis-checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      value="Algorithm and Problem Solving"
                      checked={interests.includes(
                        "Algorithm and Problem Solving"
                      )}
                      onChange={handleCheckboxChange}
                    />
                    Algorithm and Problem Solving
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Database Design and Management"
                      checked={interests.includes(
                        "Database Design and Management"
                      )}
                      onChange={handleCheckboxChange}
                    />
                    Database Design and Management
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Software Development and Design"
                      checked={interests.includes(
                        "Software Development and Design"
                      )}
                      onChange={handleCheckboxChange}
                    />
                    Software Development and Design
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="System Administration"
                      checked={interests.includes("System Administration")}
                      onChange={handleCheckboxChange}
                    />
                    System Administration
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Hardware and Embedded Systems"
                      checked={interests.includes(
                        "Hardware and Embedded Systems"
                      )}
                      onChange={handleCheckboxChange}
                    />
                    Hardware and Embedded Systems
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Operating Systems"
                      checked={interests.includes("Operating Systems")}
                      onChange={handleCheckboxChange}
                    />
                    Operating Systems
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Human-Computer Interaction"
                      checked={interests.includes("Human-Computer Interaction")}
                      onChange={handleCheckboxChange}
                    />
                    Human-Computer Interaction
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Networking"
                      checked={interests.includes("Networking")}
                      onChange={handleCheckboxChange}
                    />
                    Networking
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Scientific Computations"
                      checked={interests.includes("Scientific Computations")}
                      onChange={handleCheckboxChange}
                    />
                    Scientific Computations
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Open Source Contribution"
                      checked={interests.includes("Open Source Contribution")}
                      onChange={handleCheckboxChange}
                    />
                    Open Source Contribution
                  </label>
                </div>

                {/* Technical Details Section */}
                <div className="regis-p3-info">
                  <h3>Technical Details</h3>
                  <p>Choose 1-5 options</p>
                </div>
                <hr className="regis-line" />
                <div className="regis-checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      value="Web Development"
                      checked={interests.includes("Web Development")}
                      onChange={handleCheckboxChange}
                    />
                    Web Development
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Mobile App Development"
                      checked={interests.includes("Mobile App Development")}
                      onChange={handleCheckboxChange}
                    />
                    Mobile App Development
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Game Development"
                      checked={interests.includes("Game Development")}
                      onChange={handleCheckboxChange}
                    />
                    Game Development
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="AI / Machine Learning"
                      checked={interests.includes("AI / Machine Learning")}
                      onChange={handleCheckboxChange}
                    />
                    AI / Machine Learning
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Cyber Security"
                      checked={interests.includes("Cyber Security")}
                      onChange={handleCheckboxChange}
                    />
                    Cyber Security
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Data Science and Analytics"
                      checked={interests.includes("Data Science and Analytics")}
                      onChange={handleCheckboxChange}
                    />
                    Data Science and Analytics
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Cloud Computing"
                      checked={interests.includes("Cloud Computing")}
                      onChange={handleCheckboxChange}
                    />
                    Cloud Computing
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Dev Ops"
                      checked={interests.includes("Dev Ops")}
                      onChange={handleCheckboxChange}
                    />
                    Dev Ops
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Blockchain and Cryptography"
                      checked={interests.includes(
                        "Blockchain and Cryptography"
                      )}
                      onChange={handleCheckboxChange}
                    />
                    Blockchain and Cryptography
                  </label>
                </div>

                <div className="regis-navigation-buttons">
                  <button
                    type="button"
                    className="regis-btn"
                    onClick={handlePrev}
                  >
                    ← PREVIOUS
                  </button>
                </div>

                {errorMessage ? (
                  <div className="regis-error-message">{errorMessage}</div>
                ) : (
                  <div className="regis-button-container">
                    <button
                      type="submit"
                      className="regis-signup-button"
                      onClick={handleSubmit}
                    >
                      SIGN UP
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="regis-right-contact">
            Already on YSYNC? <a href="#">Log in</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
