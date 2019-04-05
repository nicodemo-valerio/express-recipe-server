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
            throw err;
        } else {
            res.json(recipes);
        }
    });
});

router.post('/', (req, res) => {
    const recipe = req.body;
    console.log(recipe);
    Recipe.addRecipe(recipe, (err) => {
        if (err) {
            res.status(400);
            throw err;
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
            res.status(400);
            throw err;
        } else {
            res.json(recipe);
        }
    });
});

router.delete('/:_id', (req, res) => {
    const id = req.params._id;
    Recipe.deleteRecipe(id, {}, (err) => {
        if (err) {
            res.status(400);
            throw err;
        } else {
            res.send('Recipe deleted')
        }
    });
});

module.exports = router;