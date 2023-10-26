import React from "react";
import "../Styles/Banner.css";

export default function BannerImg() {
  return (
    <>
      <div className="banner-demo">
        <h1>How to use :</h1>
        <img src="/demo-app.png"></img>
        <div className="banner-text">
          <h4>Choose your Recipe</h4>
          <h4>Add in your weekly Plan</h4>
          <h4>Cook!</h4>
        </div>
      </div>
    </>
  );
}
