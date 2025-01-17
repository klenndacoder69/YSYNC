import React, { useState } from "react";
import "./Register.css";

import logo from "/assets/logo.png";

const RegistrationForm = () => {
  const [formStep, setFormStep] = useState(1);

  const handleNext = () => {
    setFormStep(formStep + 1);
  };

  const handlePrev = () => {
    setFormStep(formStep - 1);
  };

  return (
    <div class="regis-body">
        <div className="regis-container">
            <div className="regis-left-panel">
                <img src={logo} className="regis-logo" alt="Logo" />
                <p>
                Streamlined Platform for YSES<br />
                Trainees' Application Process<br /><br /><br /><br /><br /><br />
                <div className="regis-left-contact">
                    Having trouble? <a href="mailto:info@yses.org">Contact us</a>
                </div>
                </p>
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
                        required
                        />

                        <h3>MIDDLE NAME</h3>
                        <input
                        type="text"
                        id="middle-name"
                        name="middle-name"
                        placeholder="Enter Your Middle Name"
                        required
                        />

                        <h3>LAST NAME</h3>
                        <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        placeholder="Enter Your Last Name"
                        required
                        />

                        <h3>EMAIL</h3>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Your Email"
                        required
                        />

                        <h3>Password</h3>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Your Password"
                        required
                        />

                        <h3>Confirm Password</h3>
                        <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        placeholder="Confirm Your Password"
                        required
                        />

                        <div className="regis-navigation-buttons">
                        <label></label>
                        <button
                            type="button"
                            className="regis-btn"
                            onClick={handleNext}
                        >
                            NEXT →
                        </button>
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
                        required
                    />

                    <h3>University Batch</h3>
                    <input
                        type="text"
                        id="university-batch"
                        name="university-batch"
                        placeholder="Enter Your University Batch"
                        required
                    />

                    <h3>Organization Batch</h3>
                    <input
                        type="text"
                        id="organization-batch"
                        name="organization-batch"
                        placeholder="Type '-' if Trainee"
                        required
                    />

                    <h3>Birthday</h3>
                    <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        placeholder="Enter Your Birth Date"
                        required
                    />

                    <h3>Tell us more about yourself</h3>
                    <input
                        type="text"
                        id="about"
                        name="about"
                        placeholder="Enter your details"
                    ></input>

                    <div className="regis-navigation-buttons">
                        <button
                        type="button"
                        className="regis-btn"
                        onClick={handlePrev}
                        >
                        ← PREVIOUS
                        </button>
                        <button
                        type="button"
                        className="regis-btn"
                        onClick={handleNext}
                        >
                        NEXT →
                        </button>
                    </div>
                    </div>
                </div>
                )}

                {formStep === 3 && (
                <div id="regis-form3">
                    <h2>Register</h2>
                    <br />
                    <div className="regis-form-group">
                    <div className="regis-p3-info">
                        <h3>Personal Details</h3>
                        <p>Choose 1-5 options</p>
                    </div>
                    <hr className="regis-line" />
                    <div className="regis-checkbox-group">
                    <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>

                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>

                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>
                        
                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>
                    </div>

                    <br />
                    <div className="regis-p3-info">
                        <h3>Academic Details</h3>
                        <p>Choose 1-5 options</p>
                    </div>
                    <hr className="regis-line" />
                    <div className="regis-checkbox-group">
                    <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>

                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>

                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>
                        
                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>
                    </div>

                    <br />
                    <div className="regis-p3-info">
                        <h3>Technical Details</h3>
                        <p>Choose 1-5 options</p>
                    </div>
                    <hr className="regis-line" />
                    <div className="regis-checkbox-group">
                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>

                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>

                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>

                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>
                        <label><input type="checkbox" /> Placeholder</label>
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

                    <div className="regis-button-container">
                        <button type="submit" className="regis-signup-button">
                        SIGN UP
                        </button>
                    </div>
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
