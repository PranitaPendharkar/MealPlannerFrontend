import React from "react";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar({ user, setUser }) {
  // log out btn
  const handleClick = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="nav">
      <div className="nav-header">
        <div className="nav-title">
          <Link to="/">MealPlanner</Link>
        </div>
      </div>

      <nav className="nav-links">
        <Link to="/all-recipies">Recipe</Link>
        <Link to="/meal-planner">Meal-Plan</Link>
        <Link to="/favourite">Favourite</Link>

        {user !== null && (
          <>
            <span>{user.email}</span>
            <button onClick={handleClick}>Log out</button>
          </>
        )}
        {user == null && (
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
