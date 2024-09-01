import React, { useState, useEffect } from 'react';
// import RecipeForm from './RecipeForm';
// import RecipeList from './RecipeList';
import Stars from './Components/Stars';
function App() {
  const [recipes, setRecipes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({
    idMeal: '',
    strMeal: '',
    strInstructions: '',
    strIngredient1: '',
  });

  const [errors, setErrors] = useState({});

  // Load recipes from localStorage or fetch from API if not available
  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes'));
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
        'https://www.themealdb.com/api/json/v1/1/search.php?s='
      );
      const data = await response.json();
      const fetchedRecipes = data.meals || [];
      setRecipes(fetchedRecipes);
      console.log(fetchedRecipes);
      localStorage.setItem('recipes', JSON.stringify(fetchedRecipes));
    } catch (error) {
      console.error('Failed to fetch recipes', error);
    }
  }

  const validateForm = () => {
    const newErrors = {};
    if (!currentRecipe.strMeal) newErrors.strMeal = 'Recipe Title is required.';
    if (!currentRecipe.strInstructions)
      newErrors.strInstructions = 'Instructions are required.';
    if (!currentRecipe.strIngredient1)
      newErrors.strIngredient1 = 'Main Ingredient is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if there are no errors
  };

  // useEffect to clear errors after a set interval
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 2000); // Clear errors after 5 seconds

      return () => clearTimeout(timer); // Clear the timer if the component unmounts or errors change
    }
  }, [errors]);

  // Function to add a new recipe
  const addRecipe = (newRecipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  // Function to update an existing recipe
  const updateRecipe = (updatedRecipe) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.idMeal === updatedRecipe.idMeal ? updatedRecipe : recipe
    );
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  // Function to delete a recipe
  const deleteRecipe = (idMeal) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.idMeal !== idMeal);
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  // Handle form submission for adding/updating a recipe
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isEditing) {
        updateRecipe(currentRecipe);
      } else {
        addRecipe({ ...currentRecipe, idMeal: Date.now().toString() });
      }
    }
    setIsEditing(false);
    setCurrentRecipe({
      idMeal: '',
      strMeal: '',
      strInstructions: '',
      strIngredient1: '',
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
      .filter(([key, value]) => key.startsWith('strIngredient') && value)
      .map(([key, value]) => value);
  };

  return (
    <div>
      <h1>Recipes</h1>
      {errors.strMeal && <p style={{ color: 'red' }}>{errors.strMeal}</p>}
      <form onSubmit={handleFormSubmit}>
        <input
          type='text'
          name='strMeal'
          placeholder='Recipe Title'
          value={currentRecipe.strMeal}
          onChange={handleInputChange}
        />
        <textarea
          name='strInstructions'
          placeholder='Instructions'
          value={currentRecipe.strInstructions}
          onChange={handleInputChange}
          required
        />
        <input
          type='text'
          name='strIngredient1'
          placeholder='Main Ingredient'
          value={currentRecipe.strIngredient1}
          onChange={handleInputChange}
        />
        <button type='submit'>
          {isEditing ? 'Update Recipe' : 'Add Recipe'}
        </button>
      </form>

      {recipes.map((recipe) => {
        console.log(recipe);

        return (
          <div key={recipe.idMeal}>
            <h2>{recipe.strMeal}</h2>
            <ul>
              {getIngredients(recipe).map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <Stars />
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className='normal-size'
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <h2>Instructions</h2>
            <p>{recipe.strMealThumb}</p>
            <button onClick={() => handleEditClick(recipe)}>Edit</button>
            <button onClick={() => deleteRecipe(recipe.idMeal)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
