

import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import "../Styles/AllRecipes.css";
import { FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';

const { Meta } = Card;
  // Function to share a recipe on Facebook
  const shareOnFacebook = (recipe) => {
    const url = `https://www.facebook.com/sharer.php?u=${recipe.url}`;
    window.open(url, '_blank');
  };

  // Function to share a recipe on Twitter
  const shareOnTwitter = (recipe) => {
    const url = `https://twitter.com/intent/tweet?text=${recipe.label}&url=${recipe.url}`;
    window.open(url, '_blank');
  };

 
const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);
    // Function to share a recipe
    const shareRecipe = (recipe) => {
      if (navigator.share) {
        navigator.share({
          title: recipe.label,
          text: 'Check out this delicious recipe!',
          url: recipe.url,
        })
          .then(() => console.log('Recipe shared successfully.'))
          .catch((error) => console.error('Error sharing recipe:', error));
      } else {
        alert('Sharing is not supported on this browser.');
      }
    };
  return (
    <div className="recipes-container">
      <h3>Your Favorite Recipes</h3>
      <div className="recipes-wrapper">
        {favorites && favorites.map((recipe, index) => (
         <div className="recipe-card" key={index}>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt={recipe.label} src={recipe.image} />}
            >
              <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                <Meta title={recipe.label} description={recipe.mealType} />
                <div className="info-row">
        <i className="fa-brands fa-nutritionix" style={{ color: "#feda75" }}></i>
        <Meta description={Math.round(recipe.calories)} />
        <i className="fa-regular fa-clock" style={{ color: "#feda75" }}></i>
        <Meta description={`${recipe.totalTime} Minutes`} />
      </div>
              </a>
            </Card>
{/*             
           
            <div className="share-buttons">
            <button className="btn-add-planner" onClick={() => shareRecipe(recipe)}>Share</button>
            
                <i className="fa-brands fa-facebook " style={{color: "#1877F2"}} onClick={() => shareOnFacebook(recipe)}></i>
            
                <i className="fa-brands fa-twitter " style={{color: "#feda75"}} onClick={() => shareOnTwitter(recipe)}></i>

             
                </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;


