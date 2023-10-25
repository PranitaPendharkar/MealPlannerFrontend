
import './App.css'
import React, { useState, useEffect } from "react";
import Homepage from './Components/Homepage';
import Spinner from "./Components/Spinner";
import Allrecipes from "./Components/Allrecipes";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, []);

  return (
    <>
    {/* <Allrecipes/> */}

     {loading ? (
          <div id="cover-spin">
            <Spinner />
          </div>
        ) : (
          <Homepage />
        )}
    </>
  );
}

export default App;
