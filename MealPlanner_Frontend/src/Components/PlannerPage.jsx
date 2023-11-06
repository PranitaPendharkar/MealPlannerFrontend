import "../Styles/PlannerPage.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

export default function PlannerPage() {
  const [plans, setPlans] = useState([]);
  const { token } = useContext(AuthContext);

  //const localAPI = "http://localhost:8080/meal-planner/getall-meal-planners";
   const deployAPI = "https://meal-planner-backend-57g4.onrender.com/meal-planner/getall-meal-planners";

  // Fectch Data
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(deployAPI, {
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
          if (day.meals.breakfast.name) {
            grouped[date].breakfast = day.meals.breakfast;
          }
          if (day.meals.lunch.name) {
            grouped[date].lunch = day.meals.lunch;
          }
          if (day.meals.dinner.name) {
            grouped[date].dinner = day.meals.dinner;
          }
          console.log("GROUPED MEALS", grouped);
        });
      });
    });

    return grouped;
  };

  const groupedPlans = groupByDate(plans);

  // Display date in ascending order
  const sortedDates = Object.keys(groupedPlans).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric" }; //year: "numeric" (to add year)
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
  const plannerDisplayDays = 14; // display 14 days of meal planner or 2 weeks
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

  // display only 2 weeks per page
  const displayDates = getDates(startMonday, endSunday);
  console.log("DISPLAY DATE", displayDates);

  return (
    <div className="planner-wrapper">
      <div className="planner-header">
        <h4 className="week-days">Monday</h4>
        <h4 className="week-days">Tuesday</h4>
        <h4 className="week-days">Wednesday</h4>
        <h4 className="week-days">Thursday</h4>
        <h4 className="week-days">Friday</h4>
        <h4 className="week-days">Saturday</h4>
        <h4 className="week-days">Sunday</h4>
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
                    {groupedPlans[displayDate]?.breakfast && (
                      <a
                        href={groupedPlans[displayDate].breakfast.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <p>
                          {groupedPlans[displayDate].breakfast
                            ? groupedPlans[displayDate].breakfast.name
                            : ""}
                        </p>
                      </a>
                    )}
                    <h4>Lunch: </h4>
                    {groupedPlans[displayDate]?.lunch && (
                      <a
                        href={groupedPlans[displayDate].lunch.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <p>
                          {groupedPlans[displayDate].lunch
                            ? groupedPlans[displayDate].lunch.name
                            : ""}
                        </p>
                      </a>
                    )}
                    <h4>Dinner: </h4>
                    {groupedPlans[displayDate]?.dinner && (
                      <a
                        href={groupedPlans[displayDate].dinner.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <p>
                          {groupedPlans[displayDate].dinner
                            ? groupedPlans[displayDate].dinner.name
                            : ""}
                        </p>
                      </a>
                    )}
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
