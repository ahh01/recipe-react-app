# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## distribution

### /////////isabelle Lofgren //////////

#### (formulär hantering)

- en constant är ofarlig kanske den kan användas i en effekt hmm.
- skickar form data i ett objekt, finns ingen anledning att använda fler useState

```jsx
 const [isEditing, setIsEditing] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({
    idMeal: "",
    strMeal: "",
    strInstructions: "",
    strIngredient1: "",
  });

      const storedRecipes = JSON.parse(localStorage.getItem("recipes"));
    if (storedRecipes) {
      setRecipes(storedRecipes);
    } else {
      fetchRecipes();
    }
  }, []);
```

- form datan måste återställas så att man kan skriva ett nytt objekt för att skicka till local storage eller api på serven för att den ska hanteras ordentligt

```jsx
// Function to fetch recipes from the API
async function fetchRecipes() {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s='
    );
    const data = await response.json();
    const fetchedRecipes = data.meals || [];
    setRecipes(fetchedRecipes);
    localStorage.setItem('recipes', JSON.stringify(fetchedRecipes));
  } catch (error) {
    console.error('Failed to fetch recipes', error);
  }
}

// Function to add a new recipe
const addRecipe = (newRecipe) => {
  const updatedRecipes = [...recipes, newRecipe];
  setRecipes(updatedRecipes);
  localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
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
    idMeal: '',
    strMeal: '',
    strInstructions: '',
    strIngredient1: '',
  });
};
```

- finns många små problem som måste lösas för Key:value mönster i ett objekt
- jsx omvandlas till html via innerHTML eller mer kompliserade metoder

```jsx
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

  return(
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
  )
```

#### (api integration)

- fetch on waterfall. effekten sker då app komponenten aktiveras i main.jsx. det tar tid att hämta och omvandla datan till hanterbar data som vi har åtkomst till i en array

```jsx
import React, { useState, useEffect } from 'react';

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

    return( <div className="container">
      <h1>Recipe App</h1>
      {/* <RecipeForm onSave={addOrUpdateRecipe} />
      <RecipeList recipes={recipes} onEdit={addOrUpdateRecipe} onDelete={deleteRecipe} /> */}
    </div>
  )
    }
```

### /////////////Joshua Jaup //////////

#### (moc data)

- hur ser datan ut. vi kan komma åt dem genom att skriva receipt.idMeal || receipt.["prop"]
- men det finns fler sätt att komma åt datan ex. return Object.keys(newErrors).length === 0; (Erik pratar om det, men först)

```json
{
    "meals": [
      {
        "idMeal": "52977",
        "strMeal": "Corba",
        "strDrinkAlternate": null,
        "strCategory": "Side",
        "strArea": "Turkish",
        "strInstructions": "Boil the meat and then shred it into smaller pieces...",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
        "strTags": "Soup",
        "strYoutube": "https://www.youtube.com/watch?v=VVnZd8A84z4",
        "strIngredient1": "Lamb",
        "strIngredient2": "Onion",
        "strIngredient3": "Tomatoes",
        "strIngredient4": "Lemon",
        "strIngredient5": "Pepper",
        "strMeasure1": "200g",
        "strMeasure2": "1",
        "strMeasure3": "2",
        "strMeasure4": "1",
        "strMeasure5": "1 tsp",
        "strSource": "https://www.themealdb.com/meal/52977",
        "rating": 4
      },
      ...
    ]
}
```

#### happy json to image (image validation)

- the json object contain the url. just insert it in the src attribute

App.jsx

```js
 {recipes.map((recipe) => {
        console.log(recipe);

        return (
          <div key={recipe.idMeal}>
           ....
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
           ...
        );
      })}
```

#### (redigera och radera recept)

- vi manipulerar en array och behöver därför använda array metoder (filter,map, reduce)
- när vi reloadar brukar det vara bra att inte hämta all data igen

```jsx
// Function to delete a recipe
const deleteRecipe = (idMeal) => {
  const updatedRecipes = recipes.filter((recipe) => recipe.idMeal !== idMeal);
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
```

### (betyg sättning och validering) ////////// Erik Jonsson //////////

#### auto batching (validation) check the updated values

- finns mer att prata om än bara objekt och arrayer. vi har många alternativ
- attribut är bra men det finns många sätt att validera att rätt data skickas till arrayer på clienten eller serven
- fel meddlande vill vi inte visa förevigt. vi kan använda oss av en clean up f() i useEffect för att bara visa feedback några sekunder.

```jsx
  const [currentRecipe, setCurrentRecipe] = useState({
    idMeal: '',
    strMeal: '',
    strInstructions: '',
    strIngredient1: '',
  });

  const [errors, setErrors] = useState({});

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

    const handleFormSubmit = (e) => {
        ...
           if (validateForm()) {
      if (isEditing) {
        updateRecipe(currentRecipe);
      } else {
        addRecipe({ ...currentRecipe, idMeal: Date.now().toString() });
      }
    }
    ...
    }

      useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 2000); // Clear errors after 5 seconds

      return () => clearTimeout(timer); // Clear the timer if the component unmounts or errors change
    }
  }, [errors]);
```

#### star structure with (props)

- uh prettier converted double quote to single quote opsi

```jsx
import Stars from './Components/Stars';
function App() {
  return <Stars />;
}
```

Stars.jsx

- basic star logic if we did not need to match locally
- notera [ <div className='stars'>{tempStars}</div>] vi kan returnera en array av sjärnor

```jsx
import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
const Stars = ({ stars = 0, reviews }) => {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {stars > number ? (
          <BsStarFill />
        ) : stars > index ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });
  return (
    <div className='stars'>
      <div className='stars'>{tempStars}</div>
      <p className='reviews'>({reviews} customer reviews)</p>
    </div>
  );
};
export default Stars;
```

index.css

- åtkomst till classer och element (JSX är det className)

```css
.span {
  color: #ffb900;
  font-size: 1rem;
  margin-right: 0.25rem;
}
p {
  margin-left: 0.5rem;
  margin-bottom: 0;
}
```

### //////////Ahmed Abdela//////////

CDN is to much work and next js is to high tech for us.

```css
.normal-size {
  width: 300px; /* Set the width to 300 pixels */
  height: auto; /* Automatically adjust the height to maintain the aspect ratio */
  object-fit: cover; /* Ensure the image covers the area without stretching */
}
```

#### basically redux toolkit that update with spread operator

- what to only update one of many objects. find it and if it exist update. otherwise push

```js
const [ratedStars, setRatedStars] = useState([]);

const setRatedStarMatchingReceipId = (obj) => {
  console.log(obj);

  setRatedStars((prevRatedStars) => {
    // Check if the object with the same matchingId exists
    const existingIndex = prevRatedStars.findIndex(
      (item) => item.matchingId === obj.matchingId
    );

    if (existingIndex !== -1) {
      // If it exists, replace the existing object with the new one
      const updatedRatedStars = [...prevRatedStars];
      updatedRatedStars[existingIndex] = obj;
      return updatedRatedStars;
    } else {
      // If it doesn't exist, push the new object into the array
      return [...prevRatedStars, obj];
    }
  });
  console.log(ratedStars);
};

return (
  <Stars
    setRatedStarMatchingReceipId={setRatedStarMatchingReceipId}
    ratedStars={ratedStars}
    matchingId={recipe.idMeal}
  />
);
```

Stars.jsx

```jsx
const Stars = ({
  stars = 0,
  setRatedStarMatchingReceipId,
  ratedStars,
  matchingId,
}) => {
  return (
    <button
      key={index}
      onClick={() => {
        setRatedStarMatchingReceipId({ index, matchingId });
      }}
    >
      <span>
        {stars > number ? (
          <BsStarFill />
        ) : stars > index ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    </button>
  );
};
```

#### update object is correct and match the updated object

- vi har en array från serven och en från clienten. för att veta vilka objekt som hör ihop kan vi match id.
- om vi använder server id för att skapa objekt på klienden kan vi nästa gång skärmen byggs upp visa att vi tryckt på sjärnorna utan att serven vet om det

```jsx
const Stars = ({
  stars = 0,
  setRatedStarMatchingReceipId,
  ratedStars,
  matchingId,
}) => {
  const matchedRating = ratedStars.find(
    (rating) => rating.matchingId == matchingId
  )
  //ratedStars && ratedStars.matchingId == matchingId
  if (matchedRating) {
    console.log(matchedRating.indexStartFromZeroButValueFromOne)
    updatedStars = matchedRating.indexStartFromZeroButValueFromOne
  }

//from array
   return (
      <button
        key={index}
        onClick={() => {
          setRatedStarMatchingReceipId({ index, matchingId });
          const indexStartFromZeroButValueFromOne = index + 1;
          setRatedStarMatchingReceipId({
            indexStartFromZeroButValueFromOne,
            matchingId,
          });
        }}
   )
}
```
