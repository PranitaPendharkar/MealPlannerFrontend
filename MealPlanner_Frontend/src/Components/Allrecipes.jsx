import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

Modal.setAppElement("#root"); // Set the root element for accessibility

const Allrecipes = () => {
  const [date, setDate] = useState(new Date());
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const recipesPerPage = 10; // Number of recipes per page
  const appId = import.meta.env.VITE_API_ID;
    const appKey = import.meta.env.VITE_APP_KEY;

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const fetchRecipes = async () => {
    try {
      const appId = import.meta.env.VITE_API_ID;
      const appKey = import.meta.env.VITE_APP_KEY;
      const from = (currentPage - 1) * recipesPerPage;
      const to = from + recipesPerPage;
      const edamamAPIUrl = `https://api.edamam.com/search?q=pasta&from=${from}&to=${to}&app_id=${appId}&app_key=${appKey}`;
      console.log("API URL:", edamamAPIUrl);

      const response = await axios.get(edamamAPIUrl);
      const newRecipes = response.data.hits.map((hit) => hit.recipe);

      setRecipes(newRecipes); // Directly set the new recipes
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }



    
  };

  useEffect(() => {
    fetchRecipes();
  }, [currentPage]);

  const handleAddToPlanner = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <img src={recipe.image} alt={recipe.label} />
            <a href={recipe.url} target="_blank" rel="noopener noreferrer">
              <h3>{recipe.label}</h3>
            </a>
            <button onClick={openModal}>Add to planner</button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
              <h2>Choose a day to save the meal</h2>
              <Calendar onChange={handleDateChange} value={date} />
              <p>Selected Date: {date.toDateString()}</p>
              <button onClick={() => handleAddToPlanner(recipe)}>
                Add to weekly planner
              </button>
              {selectedRecipe && (
                <div>
                  <h3>Selected Recipe: {selectedRecipe.label}</h3>
                  <p>Selected Date: {date.toDateString()}</p>
                </div>
              )}
              <button>All Recipes</button>
              <button onClick={closeModal}>Close</button>
            </Modal>
          </li>
        ))}
      </ul>
      <button
  onClick={() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }}
>
  Previous
</button>

      <button
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Allrecipes;
