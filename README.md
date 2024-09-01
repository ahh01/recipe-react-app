# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

```jsx
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

#### star structure

- uh prettier converted double quote to single quote opsi

```jsx
import Stars from './Components/Stars';
function App() {
  return <Stars />;
}
```

Stars.jsx

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

#### happy json to image

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

CDN is to much work and next js is to high tech for us.

```css
.normal-size {
  width: 300px; /* Set the width to 300 pixels */
  height: auto; /* Automatically adjust the height to maintain the aspect ratio */
  object-fit: cover; /* Ensure the image covers the area without stretching */
}
```

####

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
