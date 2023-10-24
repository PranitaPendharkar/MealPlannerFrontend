import React from 'react'
import '../Styles/Navbar.css'
import { Link} from "react-router-dom";

function Navbar() {
  return (
    <div className="nav">
   
    <div className="nav-header">
      <div className="nav-title">
        MealPlanner
      </div>
    </div>
    <div className="nav-btn">
      <label className="nav-check">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
    
    <div className="nav-links">
    <Link to="/AllRecepies">
    <a href="" >Recipes</a>
            </Link>
      <a href="" >Meal-Plan</a>
      <a href="">Favourite</a>
      <a href="" >Sign In/Sign up</a>
     
    </div>
  </div>
  )
}

export default Navbar