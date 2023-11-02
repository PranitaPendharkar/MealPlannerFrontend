import "../Styles/PlannerPage.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import Monday from "../Components/Monday";

export default function PlannerPage() {
  return (
    <div className="planner-container">
      <Monday />
    </div>
  );
}
