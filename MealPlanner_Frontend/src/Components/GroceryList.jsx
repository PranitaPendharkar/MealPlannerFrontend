import React from "react";
import { useIngredientsContext } from "../context/ingredientsContext";
import Modal from "react-modal";

import Swal from 'sweetalert2';
export default function GroceryList({ isOpen, onClose }) {
    const { ingredientsList } = useIngredientsContext();
    function generateGroceryListText(ingredientsList) {
        return ingredientsList.join("\n");
      }
      function downloadGroceryList() {
        const groceryListText = generateGroceryListText(ingredientsList);
        const blob = new Blob([groceryListText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
      
        const a = document.createElement("a");
        a.href = url;
        a.download = "grocery-list.txt"; 
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        Swal.fire({
            icon: 'success',
            title: 'Your current grocery list downloaded successfully!!!',
            showConfirmButton: false,
            timer: 4000, // Automatically close the alert after 2 seconds
          });
              // Close the modal after successfully adding the recipe
           
      }
      
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Grocery List Modal"
  >
    <div className="grocery-list">
      <h2>Ingredients List for your newly added meals</h2><br/>
      <div className="grocery-list-content">
        {ingredientsList.length > 0 ? (
          <ul>
            {ingredientsList.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        ) : (
          <p>Your grocery list is empty.</p>
        )}
      </div>
      <button  className="btn-add-planner" onClick={downloadGroceryList}>Download Grocery List</button>&nbsp;&nbsp;
      <button  className="btn-add-planner" onClick={onClose}>Close</button>
    
    </div>
  </Modal>
);
 
}
