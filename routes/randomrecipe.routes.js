const express = require('express');
const db = require('../db');

const router = express.Router();



router.get('/', async (req,res) => {

    try {
        const recipeQuery = 'SELECT id, recipeName, instructions FROM recipe ORDER BY RANDOM() LIMIT 1;';
        const recipeResult = await db.query(recipeQuery);
        const selectedrecipe = recipeResult.rows[0];

        const ingredientquery = 'SELECT b.ingredientName FROM ingredient b INNER JOIN IngredientInRecipe c ON b.id = c.ingredientId WHERE c.recipeId = $1;';
        const ingredientsresult = await db.query(ingredientquery, [selectedrecipe.id])
    
        const ingredients = ingredientsresult.rows.map( element => element.ingredientname);

        const ranodmrecipe = {
            recipe: selectedrecipe,
            ingredients: ingredients
        };
        
        res.json(ranodmrecipe);

    } catch (error) {
        console.log(error);
        res.status(500).json({errorMesssage: 'internal server error.'})
    }
    

});

module.exports = router