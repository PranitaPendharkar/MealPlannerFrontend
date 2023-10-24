
import React, { useState, useEffect  } from 'react';
import { Link} from "react-router-dom";
import axios from 'axios';
import SearchRecipe from './SearchRecipe';
import Modal from 'react-modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import { useMealPlanner } from '../context/MealPlannerContext';


Modal.setAppElement('#root'); // Set the root element for accessibility


const Allrecipes = () => {
  const [date, setDate] = useState(new Date()); 
  const [recipes, setRecipes] = useState([]);
  const [from, setFrom] = useState(0); // Starting index for fetching recipes
  const [to, setTo] = useState(9); // Number of recipes to fetch in each batch
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const fetchRecipes = () => {
    // Replace 'YOUR_APP_ID' and 'YOUR_APP_KEY' with your actual Edamam API credentials
    const appId = '6ff74631';
    const appKey = 'ce5232185a00a26da33edc0f3c24aaf2';
    const apiUrl = `https://api.edamam.com/search?q=pasta&app_id=${appId}&app_key=${appKey}&from=${from}&to=${to}`;

    axios.get(apiUrl)
      .then((response) => {
        const newRecipes = response.data.hits.map(hit => hit.recipe);
        setRecipes([...recipes, ...newRecipes]);
        setFrom(to + 1);
        setTo(to + 10);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleAddToPlanner = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div>
     <SearchRecipe/>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            
             <p>Calories: {recipe.calories.toFixed(2)}</p>
            <img src={recipe.image} alt={recipe.label} />
            <a href={recipe.url} target="_blank" rel="noopener noreferrer">
            {/* View Recipe Instructions */}
            <h3>{recipe.label}</h3>
          </a>
          <button onClick={openModal}>Add to planner</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Choose a day to save the meal</h2>
        <Calendar
        onChange={handleDateChange}
        value={date}
      />
      <p>Selected Date: {date.toDateString()}</p>
        <button onClick={()=>handleAddToPlanner(recipe)} >Add to weekly planner</button>
        {selectedRecipe && (
        <div>
          <h3>Selected Recipe: {selectedRecipe.label}</h3>
        
           <p>Selected Date: {date.toDateString()}</p>
        </div>
      )}
        <button >All Recipes</button>
       
        <button onClick={closeModal}>Close</button>
      </Modal>
          </li>
        ))}
      </ul>
      <button onClick={fetchRecipes}>More</button>
    </div>
  );
};

export default Allrecipes;


