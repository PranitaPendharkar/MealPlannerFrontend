import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import "../Styles/AllRecipes.css";


const { Meta } = Card

 
const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;


