import "../Styles/PlannerPage.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function PlannerPage() {
  const [plans, setPlans] = useState([]);
  const { token } = useContext(AuthContext);

  const localAPI = "http://localhost:8080/meal-planner/getall-meal-planners";
  // const deployAPI = "https://meal-planner-backend-57g4.onrender.com/meal-planner/getall-meal-planners";

  // Fectch Data
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
  console.log("checkData", plans);

  // group meal by date and avoid duplicates
  const groupByDate = (plans) => {
    const grouped = {};

    plans.forEach((plan) => {
      plan.weeks.forEach((week) => {
        week.days.forEach((day) => {
          const date = day.date;
          if (!grouped[date]) {
            grouped[date] = {
              breakfast: null,
              lunch: null,
              dinner: null,
            };
          }
          // Only add the meal if it hasn't been added already for that day and time.
          if (day.meals.breakfast && !grouped[date].breakfast) {
            grouped[date].breakfast = day.meals.breakfast;
          }
          if (day.meals.lunch && !grouped[date].lunch) {
            grouped[date].lunch = day.meals.lunch;
          }
          if (day.meals.dinner && !grouped[date].dinner) {
            grouped[date].dinner = day.meals.dinner;
          }
        });
      });
    });

    return grouped;
  };

  const groupedPlans = groupByDate(plans);
  const sortedDates = Object.keys(groupedPlans).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  //1 is the previous monday, of this week; 2 monday before that and so on...
  const whichMonday = 1;

  // show week from previous monday and set hour to 0 just to have the beginning of the date time
  const startMonday = new Date();
  startMonday.setDate(
    startMonday.getDate() - whichMonday * ((startMonday.getDay() + 6) % 7)
  );
  startMonday.setHours(0, 0, 0, 0);

  // console.log("PRE.MOOONNDAY", startMonday.toISOString());
  const plannerDisplayDays = 14; // display 14 days of meal planner

  // limit the display date until sunday week
  const endSunday = new Date(startMonday);
  endSunday.setDate(startMonday.getDate() + plannerDisplayDays - 1);

  // console.log("ENNNDDDDD", endSunday.toISOString());

  // get an array of dates between two dates
  function getDates(startDate, stopDate) {
    let dateArray = new Array();
    let currentDate = new Date(startDate);
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate).toISOString());
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }

  // display only 2 weeks per time
  const displayDates = getDates(startMonday, endSunday);
  console.log(displayDates);

  return (
    <div className="planner-wrapper">
      <div className="planner-header">
        <h4 className="week-days">Mon</h4>
        <h4 className="week-days">Tue</h4>
        <h4 className="week-days">Wed</h4>
        <h4 className="week-days">Thu</h4>
        <h4 className="week-days">Fri</h4>
        <h4 className="week-days">Sat</h4>
        <h4 className="week-days">Sun</h4>
      </div>
      <div className="planner-container">
        {displayDates.map((displayDate) => {
          // Check if there is a corresponding date in sortedDates
          const matchingDate = sortedDates.find((date) => date === displayDate);

          return (
            <div className="planner-card" key={displayDate}>
              {matchingDate ? (
                <div key={displayDate}>
                  <div className="format-date">
                    <h3>{formatDate(displayDate)}</h3>
                  </div>
                  <div className="meals">
                    <h4>Breakfast:</h4>
                    <p>
                      {" "}
                      {groupedPlans[displayDate].breakfast
                        ? groupedPlans[displayDate].breakfast.name
                        : ""}
                    </p>
                    <h4>Lunch: </h4>
                    <p>
                      {groupedPlans[displayDate].lunch
                        ? groupedPlans[displayDate].lunch.name
                        : ""}
                    </p>

                    <h4>Dinner: </h4>
                    <p>
                      {groupedPlans[displayDate].dinner
                        ? groupedPlans[displayDate].dinner.name
                        : ""}
                    </p>
                  </div>
                </div>
              ) : (
                <div key={displayDate}>
                  <div className="format-date">
                    <h3>{formatDate(displayDate)}</h3>
                  </div>
                  <div className="meals">
                    <p>Breakfast: </p>
                    <p>Lunch: </p>
                    <p>Dinner: </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Next steps
// 1 - Grid calendar (css)
// 2- Header week Days
// 3 - change date format
// 4- clean the code
