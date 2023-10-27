import "./App.css";
import { useState, useEffect } from "react";
import Homepage from "./Components/Homepage";
import Spinner from "./Components/Spinner";
import Allrecipes from "./Components/Allrecipes";
import Login from "./Components/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Components/SignUp";
import Navbar from "./Components/Navbar";
import Favorite from "./Components/Favorite";
import Footer from "./Components/Footer";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import MealPlannerComponent from "./Components/MealPlannerComponent";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/all-recipies"
          element={token ? <Allrecipes /> : <Navigate to="/login" />}
        />
        <Route
          path="/favorite"
          element={token ? <Favorite /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/" />}
        />
        {/* below route is just for testing if you want to do add to planner to All recipe page change below path to all-recipes and comment 2nd route */} 
         <Route
          path="/meal-planner"
          element={token ? <MealPlannerComponent /> : <Navigate to="/login" />}
        />
      </Routes>

<Footer/>
      {/* {loading ? (
        <div id="cover-spin">
          <Spinner />
        </div>
      ) : (
        <Homepage />
      )} */}


    </>
  );
}

export default App;
