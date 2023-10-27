import WeeklyPlan from './WeeklyPlan';
import React, { useEffect, useState,useContext } from 'react';
import Allrecipes from './Allrecipes';
import { AuthContext } from "../context/authContext";


function MealPlannerComponent() {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
// Define selectedRecipe as an array
const selectedRecipefordatabase = [];

  const [weeklyPlan, setWeeklyPlan] = useState([
    { recipe: null, date: null },
    { recipe: null, date: null },
    { recipe: null, date: null },
    { recipe: null, date: null },
    { recipe: null, date: null },
    { recipe: null, date: null },
    { recipe: null, date: null }
  ]);

   const { token } = useContext(AuthContext);
  
  useEffect(()=>{
  //function to save the meal planner to the backend
  const saveMealPlanner = (mealPlannerData) => {
    fetch('http://localhost:8080/meal-planner/create-meal-planners', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( mealPlannerData )
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log('Meal planner saved:', data); 
      })
      .catch((error) => {
        //  any errors that occur during the request
        console.error('Error saving meal planner:', error);
      });
  };

    const currentDate = new Date(); // Get the current date
    const mealPlannerData = {
      user: "", 
      weeks: [
        {
          days: [
            {
              date:currentDate,
              meals: {
                breakfast: {
                  link: selectedRecipefordatabase.url,
                  name: selectedRecipefordatabase.name,
                },
                // Lunch: {
                //   link: selectedRecipefordb.url,
                //   name: selectedRecipefordb.name,
                // },
                // Dinner: {
                //   link: selectedRecipefordb.url,
                //   name: selectedRecipefordb.name,
                // },
              },
            },
          ],
        },
      ],
    };
    if (token) {
      saveMealPlanner(mealPlannerData);
    }
  
},[token]);


 const addToWeeklyPlan = (recipe, day, date) => {
  const dayIndex = getDayIndex(day);
  const WeeklyPlan = [...weeklyPlan];
  WeeklyPlan[dayIndex] = { recipe, date };
  setWeeklyPlan(WeeklyPlan);
  setSelectedRecipe(recipe);
  setSelectedDate(date);

  WeeklyPlan.forEach((day) => {
    if (day.recipe) {
      // If a recipe is selected for the day
      selectedRecipefordatabase.push({
        url: day.recipe.url,
        name: day.recipe.label,
      });
    }
  });
};

const getDayIndex= (day) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
  return daysOfWeek.indexOf(day);
};


  return (
    <div>
    
     <Allrecipes onRecipeSelect={(recipe, day, date) => addToWeeklyPlan(recipe, day, date)}
              setSelectedDate={setSelectedDate} 
              setSelectedRecipe={setSelectedRecipe}/>

      <WeeklyPlan weeklyPlan={weeklyPlan} />

  </div>
  );
}
export default MealPlannerComponent;

