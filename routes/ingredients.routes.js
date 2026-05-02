const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req,res) => {

    const ingredient = await db.query('SELECT * FROM ingredient;'); // await tähendab et ootab kuni saab päringult vastuse ja alles siis liigub edasi
    res.json(ingredient.rows);
});


router.post('/', async (req, res) => {
    const {ingredientname} = req.body;

    const data = await db.query('SELECT * FROM ingredient WHERE ingredientname = $1', [ingredientname]);
    
    console.log(data.rows)
    if(data.rows.length !== 0) {
        res.json({message: "ingredient already exists."});
    } else {
        console.log('retsepti pole');
        try{
            const result = await db.query("INSERT INTO ingredient (ingredientname) VALUES ($1);", [ingredientname]);
            console.log(result.rowCount);
            res.json({message: `${result.rowCount} rows was added`});
        }
        catch(error){
            console.log(error);
        }
    }
});


router.delete('/', async (req,res) => {
    const {ingredientname} = req.body;
    const data = await db.query('SELECT * FROM ingredient WHERE ingredientname = $1', [ingredientname]);


    if(data.rows.length === 0) {
        res.json({message: "theres no such ingredient."});
    } else {
        try{
            const result = await db.query('DELETE FROM ingredient WHERE ingredientname = $1', [ingredientname]);
            res.json({message: `${result.rowCount} rows was deleted`});
        }
        catch(error) {
            console.log(error);
        }
    }
    
});

module.exports = router