import React, { createContext, useContext, useState } from 'react';

export const ingredientsContext = createContext();
export const useIngredientsContext = () => useContext(ingredientsContext);

export const IngredientsProvider = ({ children }) => {
  const [ingredientsList, setIngredientsList] = useState([]); // Initialize with an empty array

  return (
    <ingredientsContext.Provider value={{ ingredientsList, setIngredientsList }}>
      {children}
    </ingredientsContext.Provider>
  );
};


// export const useIngredients = () => {
//   return useContext(ingredientsContext);
// };


