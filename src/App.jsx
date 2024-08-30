import React, { useState, useEffect } from 'react';
// import RecipeForm from './RecipeForm';
// import RecipeList from './RecipeList';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recipes from TheMealDB API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setRecipes(data.meals || []);  // Handle cases where no meals are returned
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch recipes');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // // Add or update a recipe locally
  // const addOrUpdateRecipe = (recipe, index = null) => {
  //   if (index !== null) {
  //     const updatedRecipes = [...recipes];
  //     updatedRecipes[index] = recipe;
  //     setRecipes(updatedRecipes);
  //   } else {
  //     setRecipes([...recipes, recipe]);
  //   }
  // };

  // Delete a recipe locally
  // const deleteRecipe = (index) => {
  //   const updatedRecipes = recipes.filter((_, i) => i !== index);
  //   setRecipes(updatedRecipes);
  // };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>{error}</p>;
  // }

  return (
    <div className="container">
      <h1>Recipe App</h1>
      {/* <RecipeForm onSave={addOrUpdateRecipe} />
      <RecipeList recipes={recipes} onEdit={addOrUpdateRecipe} onDelete={deleteRecipe} /> */}
    </div>
  );
}

export default App;
