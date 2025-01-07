import "./Homepage.css"
export default function Homepage() {
    return(
        <>
    <div className="homepage">
        <div className="bg">
            <div className="contact">
            <a href="mailto:info@yses.org">
                <img src="assets/Email Icon.png" alt="Email Icon" />
            </a>
            <a href="https://www.yses.org/">
                <img src="assets/YSES Icon.png" alt="YSES Icon" />
            </a>
            <a href="https://www.facebook.com/YSES2005/">
                <img src="assets/Facebook Icon.png" alt="Facebook Icon" />
            </a>
            <a href="https://www.instagram.com/yses2005/">
                <img src="assets/Instagram Icon.png" alt="Instagram Icon" />
            </a>
            <a href="https://x.com/yses2005">
                <img src="assets/X Icon.png" alt="X Icon" />
            </a>
            </div>
            <div className="logo-text-container">
            <img src="assets/logo.png" className="logo" alt="YSES Logo" />
            <div className="text">
                <h1>YSYNC</h1>
                <p>
                Streamlined Platform for YSES
                <br />
                Trainees' Application Process
                </p>
            </div>
            </div>
            <div className="rectangle"></div>
            <br />
            <div className="login">
            <a href="./trainees-view/landing/trainee-sign-in.html">
                <button>Login with UPmail</button>
            </a>
            <p>
                Having trouble? <a href="mailto:info@yses.org">Contact us</a>
            </p>
            </div>
        </div>
        <div className="switch">
            <a href="./members-view/members.html">
            <button>Switch to Member's View</button>
            </a>
        </div>
    </div>
    
    </>
    )
}