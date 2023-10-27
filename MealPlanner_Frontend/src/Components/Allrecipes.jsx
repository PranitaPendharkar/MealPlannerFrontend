import React, { useState, useEffect } from 'react';
import Modal from "react-modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

Modal.setAppElement("#root"); // Set the root element for accessibility

const Allrecipes = ({ onRecipeSelect, setSelectedDate, setSelectedRecipe }) => {
  const [date, setDate] = useState(new Date());
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(null);
  const [recipes, setRecipes] = useState([]);


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
    <div>
      <h2>Recipe List</h2>
      {recipes.length > 0 && (
        <ul>
          {recipes.map((recipe, index) => (
            <li key={recipe.recipe.url}>
              <img src={recipe.recipe.image} alt={recipe.label} />
              <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">
                <h3>{recipe.recipe.label}</h3>
              </a>

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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Allrecipes;

