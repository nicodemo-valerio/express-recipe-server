// routes/api/recipes.js

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Recipe = require('../../models/recipe');

mongoose.connect('mongodb://localhost/recipes', { useNewUrlParser: true });
const db = mongoose.connection;

router.get('/', (req, res) => {
    Recipe.getRecipes((err, recipes) => {
        if (err) {
            res.status(400);
        } else {
            res.json(recipes);
        }
    });
});

router.post('/', (req, res) => {
    const recipe = req.body;
    Recipe.addRecipe(recipe, (err) => {
        if (err) {
            res.status(400).json({ error: `recipe with id ${id} not found` });
        } else {
            res.json(recipe);
        }
    });
});

router.put('/:_id', (req, res) => {
    const id = req.params._id;
    const recipe = req.body;
    Recipe.updateRecipe(id, recipe, {}, (err) => {
        if (err) {
            res.status(400).json({ error: `recipe with id ${id} not found` });
        } else {
            res.json(recipe);
        }
    });
});

router.delete('/:_id', (req, res) => {
    const id = req.params._id;
    Recipe.deleteRecipe(id, {}, (err) => {
        if (err) {
            res.status(400).json({ error: `recipe with id ${id} not found` });
        } else {
            res.json({ message: `recipe with id ${id} deleted` });
        }
    });
});

module.exports = router;