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

function App() {
  const { token } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/all-recipes"
          element={token ? <AllRecipes /> : <Navigate to="/login" />}
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
      </Routes>

      <Footer />
    </>
  );
}

export default App;
