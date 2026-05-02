const express = require('express');
const db = require('../db');

const router = express.Router();



router.get('/', async (req,res) => {

    const recipes = await db.query('SELECT * FROM recipe;'); // await tähendab et ootab kuni saab päringult vastuse ja alles siis liigub edasi
    
    res.json(recipes.rows);
});

module.exports = router