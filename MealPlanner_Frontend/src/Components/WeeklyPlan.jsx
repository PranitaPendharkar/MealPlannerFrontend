import React, { useState, useEffect } from "react";
  const  WeeklyPlan =({weeklyPlan, selectedRecipe, selectedDate })=> {
    
    const getDayName = (index) => {
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday', ];
        return daysOfWeek[index];
      };
 
  return (
    <div>
        <h1>Weekly Meal Planner</h1>
    <h2>Breakfast</h2> 
 <ul>
  {weeklyPlan.map((day, index) => (
    <li key={index}>
      <strong>Day {index + 1 } ({getDayName(index)}):</strong>
      {day.recipe ? (
        <div>
           <a href={day.recipe.url} target="_blank" rel="noopener noreferrer">
                <h3>Recipe Link:{day.recipe.label}</h3>
              </a>
          <h3>Selected Recipe Name: {day.recipe.label}</h3>
          <p>Selected Date: {day.date.toDateString()}</p>
          <p>Selected Day: {day.date.toLocaleDateString('en-US', { weekday: 'long' })}</p>

        </div>
      ) : (
        <h3>No recipe selected</h3>
      )}
    </li>
  ))}
</ul>
<div>
      </div>
  </div>
  );
}

export default WeeklyPlan;



