const express = require('express');
const db = require('./db')
const recipeRouter = require('./routes/recipes.routes');
const ingredientRouter = require('./routes/ingredients.routes');
const fullRecipeRouter = require('./routes/fullRecipes.routes');
const randomRouter = require('./routes/randomrecipe.routes');
const app = express();

app.use(express.json());

app.use('/recipes', recipeRouter);
app.use('/ingredients', ingredientRouter);
app.use('/fullrecipes', fullRecipeRouter);
app.use('/random',randomRouter);



app.listen(3000, () => {
    console.log('server is running on Port 3000')
});

