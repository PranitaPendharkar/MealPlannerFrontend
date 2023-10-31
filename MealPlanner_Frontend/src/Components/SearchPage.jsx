import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/SearchRecipe.css";
import { useRecipeContext } from '../context/RecipeContext';
import { useNavigate  } from 'react-router-dom';

function SearchPage() {
    const { query, setQuery } = useRecipeContext();
  
  
  const navigateTo = useNavigate();

  const handleSearch = () => {
    setQuery(query);
    navigateTo('/results')
  };

  return (
    <div>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            value={query}
            className="searchTerm"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you looking for?"
          />
          <button className="searchButton" onClick={handleSearch}>
            <i
              className="fa-solid fa-magnifying-glass fa-spin"
              style={{ color: "#8bab6a" }}
            ></i>{" "}
            {/* Add a search icon here */}
          </button>
        </div>
      </div>
      {/* <ul>
        {recipes.map((recipe) => (
          <div className="gallery" key={recipe.recipe.label}>
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
              <a
                href={recipe.recipe.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4>View Recipe</h4>
              </a>
            </button>
          </div>
        ))}
      </ul> */}
    </div>
  );
}

export default SearchPage;
