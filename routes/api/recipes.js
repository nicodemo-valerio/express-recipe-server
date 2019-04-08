// routes/api/recipes.js

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Recipe = require('../../models/recipe');

/* mongoose.connect('mongodb+srv://ncdm:nessuna@cluster0-vikrf.mongodb.net/recipes?retryWrites=true', { useNewUrlParser: true }, (err, res) => {
    if (err) {
        console.log(`Error during connection to MongoDB: ${err}`);
    } else {
        console.log(`Connected to MongoDB remote cluster`);
    }
}); */
mongoose.connect('mongodb://localhost/recipes', { useNewUrlParser: true }, (err, res) => {
    if (err) {
        console.log(`Error during connection to MongoDB: ${err}`);
    } else {
        console.log(`Connected to local MongoDB`);
    }
});
const db = mongoose.connection;

router.get('/', (req, res) => {
    Recipe.getRecipes((err, recipes) => {
        if (err) {
            res.status(400);
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(recipes));
        }
    });
});

router.post('/', (req, res) => {
    const recipe = req.body;
    Recipe.addRecipe(recipe, (err, insertedRecipe) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(insertedRecipe));
        }
    });
});

router.put('/:_id', (req, res) => {
    const id = req.params._id;
    const recipe = req.body;
    Recipe.updateRecipe(id, recipe, {}, (err, updatedRecipe) => {
        if (err) {
            res.status(400).json({ error: `recipe with id ${id} not found` });
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(updatedRecipe));
        }
    });
});

router.delete('/:_id', (req, res) => {
    const id = req.params._id;
    Recipe.deleteRecipe(id, {}, (err) => {
        if (err) {
            res.status(400).json({ error: `recipe with id ${id} not found` });
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(JSON.stringify({ message: `recipe with id ${id} deleted` }));
        }
    });
});

module.exports = router;