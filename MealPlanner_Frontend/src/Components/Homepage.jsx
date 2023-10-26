import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import SearchRecipe from "./SearchRecipe";
import Spinner from "./Spinner";
import BannerImg from "./BannerImg";

function Homepage() {
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isloading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, []);
  return (
    <>
      {" "}
      {isloading ? (
        <div id="cover-spin">
          <Spinner />
        </div>
      ) : (
        <div>
          <Hero />
          <SearchRecipe />
          <BannerImg />
        </div>
      )}
    </>
  );
}

export default Homepage;
