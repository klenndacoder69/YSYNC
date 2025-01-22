// function for handling unauthorized access
import "./Unauthorized.css";
const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <img src="assets/pikachu-unauthorized.png" alt="unauthorized" />
      <h1>NOT AUTHORIZED.</h1>
      <p>You do not have permission to view this page.</p>
      <p>
        <a
          href="/"
          onClick={() => {
            sessionStorage.clear();
          }}
        >
          Go back to the homepage.
        </a>
      </p>
    </div>
  );
};

export default Unauthorized;
