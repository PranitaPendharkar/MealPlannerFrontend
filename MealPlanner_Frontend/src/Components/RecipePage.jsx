// RecipeResults.js
import React, { useEffect, useState } from 'react';
import { Card } from "antd";
const { Meta } = Card;
import "../Styles/AllRecipes.css";
import { useRecipeContext } from '../context/RecipeContext';
import SearchRecipe from './SearchRecipe';

const RecipePage = () => {
  const { query } = useRecipeContext();
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12; // Number of recipes per page
  const appId = import.meta.env.VITE_API_ID;
  const apiKey = import.meta.env.VITE_APP_KEY;

  useEffect(() => {
    const from = (currentPage - 1) * recipesPerPage;
      const to = from + recipesPerPage;
    // Fetch recipes based on the query using the Edamam API
    const apiUrl = `https://api.edamam.com/search?q=${query}&from=${from}&to=${to}&app_id=${appId}&app_key=${apiKey}&from=0&to=8`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.hits) {
          // Extract the recipes from the API response
          const fetchedRecipes = data.hits.map((hit) => hit.recipe);
          setRecipes(fetchedRecipes);
        }
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  }, [query,setRecipes,currentPage]);

  return (
   
      // {/* <ul>
      //   {recipes.map((recipe, index) => (
      //     <li key={index}>
      //       <h3>{recipe.label}</h3>
      //       <img src={recipe.image} alt={recipe.label} />
      //       <ul>
      //         {recipe.ingredientLines.map((ingredient, i) => (
      //           <li key={i}>{ingredient}</li>
      //         ))}
      //       </ul>
      //     </li>
      //   ))}
      // </ul> */}
      <>
      <div className="recipes-container">
      <h3>Search Results for {query}</h3>
    
      <div className="recipes-wrapper">
    
        {recipes.map((recipe,index) => (
          <div className="recipe-card" key={index}>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt={recipe.label} src={recipe.image} />}
            >
              <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                {" "}
                <Meta title={recipe.label} description={recipe.mealType} />{" "}
              </a>
            </Card>
            <button className="btn-add-planner">
              View Recipe
            </button>
          </div>
          ))}
          </div>
          <div className="pagination">
        <button
          className="btn-pagination"
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          &laquo; Previous
        </button>

        <button
          className="btn-pagination"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Next &raquo;
        </button>
      </div>
    </div>
    </>
  );
};

export default RecipePage;
