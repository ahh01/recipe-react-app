import React, { useState, useEffect } from 'react';
// import RecipeForm from './RecipeForm';
// import RecipeList from './RecipeList';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({
    idMeal: "",
    strMeal: "",
    strInstructions: "",
    strIngredient1: "",
  });

  // Load recipes from localStorage or fetch from API if not available
  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes"));
    if (storedRecipes) {
      setRecipes(storedRecipes);
    } else {
      fetchRecipes();
    }
  }, []);

  // Function to fetch recipes from the API
  async function fetchRecipes() {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      const data = await response.json();
      const fetchedRecipes = data.meals || [];
      setRecipes(fetchedRecipes);
      localStorage.setItem("recipes", JSON.stringify(fetchedRecipes));
    } catch (error) {
      console.error("Failed to fetch recipes", error);
    }
  }

  // Function to add a new recipe
  const addRecipe = (newRecipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  // Function to update an existing recipe
  const updateRecipe = (updatedRecipe) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.idMeal === updatedRecipe.idMeal ? updatedRecipe : recipe
    );
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  // Function to delete a recipe
  const deleteRecipe = (idMeal) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.idMeal !== idMeal);
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  // Handle form submission for adding/updating a recipe
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateRecipe(currentRecipe);
    } else {
      addRecipe({ ...currentRecipe, idMeal: Date.now().toString() });
    }
    setIsEditing(false);
    setCurrentRecipe({
      idMeal: "",
      strMeal: "",
      strInstructions: "",
      strIngredient1: "",
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setCurrentRecipe({
      ...currentRecipe,
      [e.target.name]: e.target.value,
    });
  };

  // Populate the form with the selected recipe's details for editing
  const handleEditClick = (recipe) => {
    setIsEditing(true);
    setCurrentRecipe(recipe);
  };

  const getIngredients = (recipe) => {
    return Object.entries(recipe)
      .filter(([key, value]) => key.startsWith("strIngredient") && value)
      .map(([key, value]) => value);
  };

  return (
    <div>
      <h1>Recipes</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="strMeal"
          placeholder="Recipe Title"
          value={currentRecipe.strMeal}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="strInstructions"
          placeholder="Instructions"
          value={currentRecipe.strInstructions}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="strIngredient1"
          placeholder="Main Ingredient"
          value={currentRecipe.strIngredient1}
          onChange={handleInputChange}
        />
        <button type="submit">{isEditing ? "Update Recipe" : "Add Recipe"}</button>
      </form>

      {recipes.map((recipe) => (
        <div key={recipe.idMeal}>
          <h2>{recipe.strMeal}</h2>
          <ul>
            {getIngredients(recipe).map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2>Instructions</h2>
          <p>{recipe.strInstructions}</p>
          <button onClick={() => handleEditClick(recipe)}>Edit</button>
          <button onClick={() => deleteRecipe(recipe.idMeal)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
