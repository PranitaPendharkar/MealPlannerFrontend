import React from "react";
import "../Styles/Hero.css";

function Hero() {
  const imageUrl =
    "https://images.squarespace-cdn.com/content/v1/5c952d4de5f7d123accad683/1647580798881-1VQIBII5OC4WKP5NTOYI/meal_plans_banner.jpg?format=2500w";
  // https://noahhelps.org/wp-content/uploads/2021/03/March_Meal-Prep-1030x515.jpeg
  return (
    <>
      <div className="container">
        <img src={imageUrl} alt="Snow" />
        {/* style={{width:100%}} */}
        <div className="centered">Create meal plans anytime and anywhere</div>
      </div>
    </>
  );
}

export default Hero;
