// RecipeContext.js
import React, { createContext, useContext, useState } from 'react';

export const RecipeContext = createContext();

export const useRecipeContext = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  return (
    <RecipeContext.Provider value={{ query, setQuery, recipes, setRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
};
