import React, { useContext } from "react";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useJwt } from "react-jwt";

function Navbar() {
  const { logout, token } = useContext(AuthContext);

  // log out btn
  const handleClick = () => {
    localStorage.removeItem("token");
    logout();
  };

  const { decodedToken } = useJwt(token);

  return (
    <div className="nav">
      <div className="nav-header">
        <div className="nav-title">
          <Link to="/">MealPlanner</Link>
        </div>
      </div>

      <nav className="nav-links">
        <Link to="/all-recipes">Recipe</Link>
        <Link to="/meal-planner">Meal-Plan</Link>
        <Link to="/favorite">Favorite</Link>
       
        {token !== null && (
          <>
            <span style={{ padding: "10px" }}>Hello, {decodedToken?.name}</span>
            <button className="log-out-btn" onClick={handleClick}>
              Log out
            </button>
          </>
        )}
        {token === null && (
          <>
            <Link to="login">Login</Link>
            <Link to="signup">Signup</Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
