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

- uh prettier converted double quote to single quote opsi
