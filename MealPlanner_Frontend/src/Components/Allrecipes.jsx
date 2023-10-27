import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Card } from "antd";
const { Meta } = Card;
import "../Styles/AllRecipes.css";
import SearchRecipe from "./SearchRecipe";
Modal.setAppElement("#root"); // Set the root element for accessibility

const Allrecipes = () => {
  const [date, setDate] = useState(new Date());
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
    <div className="recipes-container">
      <h1>Recipes</h1>
      <SearchRecipe />
      <div className="recipes-wrapper">
        {recipes.map((recipe, index) => (
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
            <button className="btn-add-planner" onClick={openModal}>
              Add to planner
            </button>
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
          Previous
        </button>

        <button
          className="btn-pagination"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Allrecipes;
