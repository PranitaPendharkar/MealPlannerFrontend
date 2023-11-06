import "./App.css";
import Homepage from "./Components/Homepage";
import Spinner from "./Components/Spinner";
import AllRecipes from "./Components/Allrecipes";
import Login from "./Components/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Components/SignUp";
import Navbar from "./Components/Navbar";
import Favorite from "./Components/Favorite";
import Footer from "./Components/Footer";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import { RecipeProvider } from "./context/RecipeContext";
import RecipePage from "./Components/RecipePage";
import PlannerPage from "./Components/PlannerPage";
import React, { useEffect, useState } from 'react';

function App() {
  const { token } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  return (
    <>
      <Navbar />
      <RecipeProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/all-recipes"
            element={token ? <AllRecipes /> : <Navigate to="/login" />}
          />
          <Route
            path="/meal-planner"
            element={token ? <PlannerPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/favorite"
            element={token ? <Favorite favorites={favorites}/> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!token ? <Signup /> : <Navigate to="/" />}
          />

          <Route
            path="/results"
            element={token ? <RecipePage favorites={favorites} setFavorites={setFavorites} /> : <Navigate to="/login" />}
          />  
        </Routes>

        <Footer />
      </RecipeProvider>
    </>
  );
}

export default App;
