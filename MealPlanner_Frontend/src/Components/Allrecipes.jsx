import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from "react-modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Card } from "antd";
const { Meta } = Card;
import "../Styles/AllRecipes.css";
import SearchRecipe from "./SearchRecipe";
Modal.setAppElement("#root"); // Set the root element for accessibility
import { AuthContext } from "../context/authContext";
import Select from "react-select";

export default function AllRecipes() {
  const [date, setDate] = useState(new Date());
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null); //npm dropdown - meals

  const { Id } = useContext(AuthContext);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12; // Number of recipes per page

  // Modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSelect = (recipe) => {
    openModal();
    setCurrentRecipe(() => {
      return { recipe };
    });
  };

  // edamam API - Recipe
  const fetchRecipes = async () => {
    try {
      const from = (currentPage - 1) * recipesPerPage;

      const appId = import.meta.env.VITE_API_ID;
      const appKey = import.meta.env.VITE_APP_KEY;

      const to = from + recipesPerPage;
      const edamamAPIUrl = `https://api.edamam.com/search?q=lunch&from=${from}&to=${to}&app_id=${appId}&app_key=${appKey}`;
      console.log("API URL:", edamamAPIUrl);

      const response = await axios.get(edamamAPIUrl);

      const newRecipes = response.data.hits.map((hit) => hit.recipe);

      setRecipes(newRecipes); // Directly set the new recipes

      console.log("new recipeesssssss", newRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [currentPage]);

  const mealPlannerData = {
    user: Id,
    weeks: [
      {
        days: [
          {
            date: Date.now(),
            meals: {
              breakfast: {
                link:
                  selectedOption === "Breakfast"
                    ? currentRecipe.recipe.url
                    : "",
                name:
                  selectedOption === "Breakfast"
                    ? currentRecipe.recipe.label
                    : "",
              },
              lunch: {
                link:
                  selectedOption === "Lunch" ? currentRecipe.recipe.url : "",
                name:
                  selectedOption === "Lunch" ? currentRecipe.recipe.label : "",
              },
              dinner: {
                link:
                  selectedOption === "Dinner" ? currentRecipe.recipe.url : "",
                name:
                  selectedOption === "Dinner" ? currentRecipe.recipe.label : "",
              },
            },
          },
        ],
      },
    ],
  };

  const handleAddToPlanner = async () => {
    console.log("SELECTED OPTION", selectedOption);
    if (currentRecipe && selectedOption) {
      const newMeal = {
        link: currentRecipe.recipe.url,
        name: currentRecipe.recipe.label,
      };

      const updatedData = { ...mealPlannerData };
      updatedData.weeks[0].days[0].meals[selectedOption.value.toLowerCase()] =
        newMeal;

      console.log("MEAL TO SAVE: ", updatedData);
      // You can now send `updatedData` to your backend.

      console.log("ABOUT TO ENTER FETCH");

      // const localAPI = "http://localhost:8080/meal-planner/create-meal-planners";
      const deployAPI =
        "https://meal-planner-backend-57g4.onrender.com/meal-planner/create-meal-planners";

      try {
        const res = await fetch(deployAPI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
        console.log("ARE WE HERE?");
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log("ERROR: ", error);
      }
    }
  };

  //npm select -dropdown
  const options = [
    { value: "Breakfast", label: "Breakfast" },
    { value: "Lunch", label: "Lunch" },
    { value: "Dinner", label: "Dinner" },
  ];

  console.log(selectedOption);

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
            <button
              className="btn-add-planner"
              onClick={() => handleSelect(recipe)}
            >
              Add to planner
            </button>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
              <h2>Choose a day to save the meal</h2>
              <Calendar onChange={handleDateChange} value={date} />
              <p>Selected Date: {date.toDateString()}</p>
              <h3>Selected recipe: {currentRecipe?.recipe.label}</h3>

              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />

              <button onClick={handleAddToPlanner}>
                Add to weekly planner
              </button>

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
}
