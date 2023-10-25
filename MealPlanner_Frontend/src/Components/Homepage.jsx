import React from "react";
import { Routes, Route } from "react-router-dom";
import Allrecipes from "./Allrecipes";

import Navbar from "./Navbar";
import Hero from "./Hero";
import SearchRecipe from "./SearchRecipe";

function Homepage() {
  return (
    <div>
      {/* <Navbar /> */}
      <Hero />
      <SearchRecipe />
      {/* <Routes>
        <Route path="/AllRecipies" element={<Allrecipes />} />
      </Routes> */}
    </div>
  );
}

export default Homepage;
