import "../Styles/PlannerPage.css";
import { useState, useEffect } from "react";

export default function PlannerPage() {
  const [plans, setPlans] = useState([]);

  // const localAPI = "http://localhost:8080/meal-planner/getall-meal-planners";
  const deployAPI =
    "https://meal-planner-backend-57g4.onrender.com/meal-planner/getall-meal-planners";

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(deployAPI);
        const data = await res.json();
        console.log("MY DATA", data);
        setPlans(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  // console.log("PLANS:", plans);

  return (
    <div className="planner-container">
      <h1>WeekPlanner</h1>
      <div className="planner-card">
        {plans ? (
          plans.map((plan) => (
            <div className="plan-card" key={plan._id}>
              <h4>{plan.weeks.days}</h4>
            </div>
          ))
        ) : (
          <h2> ????????? </h2>
        )}
      </div>

      <div className="meal">
        <h3>MONDAY</h3>
      </div>
      <div className="meal">
        <h3>Date</h3>
      </div>
      <div className="meal">
        <h3>Breakfast:</h3>
      </div>
      <div className="meal">
        <h3>Lunch:</h3>
      </div>
      <div className="meal">
        <h3>Dinner:</h3>
      </div>
    </div>
  );
}
