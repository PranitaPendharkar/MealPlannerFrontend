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
import { RecipeProvider } from './context/RecipeContext';

import RecipePage from './Components/RecipePage';

function App() {
  const { token } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <RecipeProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/all-recipes"
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
          
         <Route path="/results"  element={token ? <RecipePage /> : <Navigate to="/login" />} />
        
      </Routes>
   
       
     
      <Footer />
      </RecipeProvider>
    </>
  );
}

export default App;
