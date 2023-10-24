import React, { useState, useEffect } from "react";
import axios from "axios";

import "../Styles/SearchRecipe.css";

function SearchRecipe() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const appId = import.meta.env.VITE_API_ID;
  const appKey = import.meta.env.VITE_APP_KEY;

  useEffect(() => {
    if (query) {
      const edamamAPIUrl = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&from=0&to=6`;

      axios
        .get(edamamAPIUrl)
        .then((response) => {
          setRecipes(response.data.hits);
        })
        .catch((error) => {
          console.error("Error fetching recipes:", error);
        });
    } else {
      // Clear recipes if the query is empty
      setRecipes([]);
    }
  }, [query]);
  return (
    <div>
      {/* <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search for recipes"
    /> */}

      <div className="wrap">
        <div className="search">
          <input
            type="text"
            value={query}
            className="searchTerm"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you looking for?"
          />
        </div>
      </div>
      <ul>
        {recipes.map((recipe) => (
          <>
            <div className="gallery">
              <a target="_blank" href="img_5terre.jpg">
                <img
                  src={recipe.recipe.image}
                  alt={recipe.recipe.label}
                  width="600"
                  height="300px"
                />
              </a>
              <p className="card-title">{recipe.recipe.label}</p>
              <button className="card-btn">
                {" "}
                <a
                  href={recipe.recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* View Recipe Instructions */}
                  <h4>View Recipe</h4>
                </a>
              </button>
            </div>
          </>
        ))}
      </ul>
    </div>
  );
}

export default SearchRecipe;
