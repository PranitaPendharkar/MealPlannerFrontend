import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export default function MealContextProvider(props) {
  const saveMealPlanner = (mealPlannerData) => {
    fetch("http://localhost:8080/meal-planner/create-meal-planners", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mealPlannerData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(
          "$$$$$$$$$$$$$$$$$$SAVED MEAL PLAN$$$$$$$$$$$$$$$$$:",
          data
        );
      })
      .catch((error) => {
        //  any errors that occur during the request
        console.error("Error saving meal planner:", error);
      });
  };

  return (
    <AuthContext.Provider value={{ saveMealPlanner }}>
      {props.children}
    </AuthContext.Provider>
  );
}
