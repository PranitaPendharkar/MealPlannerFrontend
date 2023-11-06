// RecipeResults.js
import React, { useEffect, useState } from 'react';
import { Card } from "antd";
const { Meta } = Card;
import "../Styles/AllRecipes.css";
import { useRecipeContext } from '../context/RecipeContext';
import SearchRecipe from './SearchRecipe';
import Swal from 'sweetalert2';

const RecipePage = () => {
  const { query } = useRecipeContext();
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12; // Number of recipes per page
  const appId = import.meta.env.VITE_API_ID;
  const apiKey = import.meta.env.VITE_APP_KEY;
 // State to manage favorite recipes
 const [favorites, setFavorites] = useState([]);

 // Function to add a recipe to favorites
 const addToFavorites = (recipe) => {
   // Check if the recipe is already in favorites to prevent duplicates
   if (!favorites.some((favorite) => favorite.label === recipe.label)) {
     const newFavorites = [...favorites, recipe];
     setFavorites(newFavorites);
     // Store updated favorites in local storage
     localStorage.setItem('favorites', JSON.stringify(newFavorites));
   }
   Swal.fire({
     icon: 'success',
     title: 'Your recipe is successfully added favourites!!!',
     showConfirmButton: false,
     timer: 4000, // Automatically close the alert after 2 seconds
   });
 };


 useEffect(() => {
   const storedFavorites = localStorage.getItem('favorites');
   if (storedFavorites) {
     setFavorites(JSON.parse(storedFavorites));
   }
 }, []);
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
                <div className="info-row">
        <i className="fa-brands fa-nutritionix" style={{ color: "#feda75" }}></i>
        <Meta description={Math.round(recipe.calories)} />
        <i className="fa-regular fa-clock" style={{ color: "#feda75" }}></i>
        <Meta description={`${recipe.totalTime} Minutes`} />
      </div>
              </a>
        <div className="favorite-icon"> 
<button className="searchButton" onClick={() => addToFavorites(recipe)}>
            <i onClick={() => addToFavorites(recipe)}
              className="fa-solid fa-heart fa-beat-fade"
              style={{ color: "#df0712"}}
            ></i>{" "}
          
          </button>
      </div>
            </Card>
            <button className="btn-add-planner">
              <a
                href={recipe.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4>View Recipe</h4>
              </a>
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
