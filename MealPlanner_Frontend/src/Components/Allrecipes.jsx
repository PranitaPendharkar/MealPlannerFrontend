import React, { useState, useEffect } from 'react';
import Modal from "react-modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Card } from "antd";
const { Meta } = Card;
import "../Styles/AllRecipes.css";
import SearchRecipe from "./SearchRecipe";
Modal.setAppElement("#root"); // Set the root element for accessibility

const Allrecipes = ({ onRecipeSelect, setSelectedDate, setSelectedRecipe }) => {
  const [date, setDate] = useState(new Date());
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const recipesPerPage = 12; // Number of recipes per page

  const appId = import.meta.env.VITE_API_ID;
  const appKey = import.meta.env.VITE_APP_KEY;

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const openModal = (recipeIndex) => {
    setSelectedRecipeIndex(recipeIndex);
  };

  const closeModal = () => {
    setSelectedRecipeIndex(null);
  };

  const handleAddToPlanner = (recipe, day, date) => {
    setSelectedRecipe(recipe);
    setSelectedDate(date);
    onRecipeSelect(recipe, day, date);
    setSelectedRecipeIndex(null); // Close the modal

  };

  const getDayName = (index) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[index];
  };

  useEffect(() => {
    fetch(`https://api.edamam.com/search?q=breakfast&app_id=${appId}&app_key=${appKey}`)
      .then(response => response.json())
      .then(data => setRecipes(data.hits));
  }, []);

  return (

    <div className="recipes-container">
      <h1>Recipe List</h1>
      {recipes.length > 0 && (
        <div className="recipes-wrapper">
          {recipes.map((recipe, index) => (
            <div className="recipe-card" key={recipe.recipe.url}>
    
     <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt={recipe.recipe.label} src={recipe.recipe.image} />}
            >
              <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">
                {" "}
                <Meta title={recipe.recipe.label} description={recipe.recipe.mealType} />{" "}
              </a>
            </Card>

              <button onClick={() => openModal(index)}>Add to planner</button>
              <Modal
                isOpen={selectedRecipeIndex === index}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
              >
                <h2>Choose a day to save the meal</h2>
                <Calendar onChange={handleDateChange} value={date} />
                <button onClick={() => handleAddToPlanner(recipe.recipe, getDayName(date.getDay()), date)}>
                  Add to weekly planner
                </button>
                <button onClick={closeModal}>Close</button>
              </Modal>
            </div>
          ))}
        </div >  
)}
   
    </div>
  );
}

export default Allrecipes;

