import "../Styles/PlannerPage.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Monday() {
  const [plans, setPlans] = useState([]);
  const { token } = useContext(AuthContext);
  const localAPI = "http://localhost:8080/meal-planner/getall-meal-planners";

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(localAPI, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setPlans(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  let dateDisplayed = false; // Variable to track whether the date has been displayed

  return (
    <div className="planner-container">
      <div className="planner-card">
        <h3>Monday</h3>
        {plans.length > 0 ? (
          plans.map((plan) => (
            <div className="plan-card" key={plan._id}>
              {plan.weeks.map((week) => (
                <div key={week._id}>
                  {week.days.map((day, index) => (
                    <div key={index}>
                      {/* Display the date only for the first day */}
                      {!dateDisplayed && <p>Date: {day.date}</p>}
                      {(dateDisplayed = true)}{" "}
                      {/* Update the variable after displaying the date */}
                      {day.meals.breakfast.name && (
                        <p>Breakfast: {day.meals.breakfast.name}</p>
                      )}
                      {day.meals.lunch.name && (
                        <p>Lunch: {day.meals.lunch.name}</p>
                      )}
                      {day.meals.dinner.name && (
                        <p>Dinner: {day.meals.dinner.name}</p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))
        ) : (
          <h2> ????????? </h2>
        )}
      </div>
    </div>
  );
}
