import "./App.css";
import { useState, useEffect } from "react";
import Homepage from "./Components/Homepage";
import Spinner from "./Components/Spinner";
import Allrecipes from "./Components/Allrecipes";
import Login from "./Components/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Components/SignUp";
import Navbar from "./Components/Navbar";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // check if user exists
  useEffect(() => {
    if (!user) setUser(JSON.parse(localStorage.getItem("user")));
  }, [user]);

  console.log("user", user);


  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, []);

  return (
    <>
     <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element=<Homepage/>} />
        <Route
          path="/all-recipies"
          element={user ? <Allrecipes user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup setUser={setUser} /> : <Navigate to="/" />}
        />
      </Routes>

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
