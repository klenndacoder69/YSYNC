import React, { useState } from 'react';
import './members-sign-in.css';

import bg from "./assets/YSES group.png";
import logo from "./assets/logo.png";
import emailicon from "./assets/Email Icon.png";
import facebookicon from "./assets/Facebook Icon.png";
import instagramicon from "./assets/Instagram Icon.png";
import xicon from "./assets/X Icon.png";
import ysesicon from "./assets/YSES Icon.png";


function LoginPage() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const upEmailPattern = /^[a-zA-Z0-9._%+-]+@up\.edu\.ph$/;

    if (!upEmailPattern.test(email)) {
      setErrorMessage("Please enter a valid UPmail address (@up.edu.ph)");
    } else {
      setErrorMessage('');
      window.location.href = "#";
    }
  };

  return (
    <div
      className="member-signin-bg"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="member-signin-main">
        <div className="member-signin-main-container">
          <div className="member-signin-logo-image-text-container">
            <img src={logo} className="member-signin-logo" alt="YSES Logo" />
            <div className="member-signin-logo-text-container">
              <h1>YSYNC</h1>
              <p>Streamlined Platform for YSES<br />Trainees' Application Process</p>
            </div>
          </div>
          <div className="member-signin-card-container">
            <div className="member-signin-rectangle"></div>
            <h1>Welcome back, YSER!</h1>
            <form id="email-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                id="email"
                className="member-signin-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              /><br />
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="member-signin-password"
                required
              /><br />
              <span id="errorMessage" className="member-signin-error">{errorMessage}</span><br />
              <input type="submit" value="Login with UPmail" id="submit-btn" className="member-signin-submit-btn" />
            </form>
            <p>Having trouble? <a href="mailto:info@yses.org">Contact us</a></p>
          </div>
          <div className="member-signin-contact-container">
            <a href="mailto:info@yses.org"><img src={emailicon} alt="Email" /></a>
            <a href="https://www.yses.org/"><img src={ysesicon} alt="YSES Icon" /></a>
            <a href="https://www.facebook.com/YSES2005/"><img src={facebookicon} alt="Facebook" /></a>
            <a href="https://www.instagram.com/yses2005/"><img src={instagramicon} alt="Instagram" /></a>
            <a href="https://x.com/yses2005"><img src={xicon} alt="X" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
