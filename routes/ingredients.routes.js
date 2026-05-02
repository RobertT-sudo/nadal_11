const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req,res) => {

    const ingredient = await db.query('SELECT * FROM ingredient;'); // await tähendab et ootab kuni saab päringult vastuse ja alles siis liigub edasi
    res.json(ingredient.rows);
});

module.exports = router