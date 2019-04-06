// routes/api/recipes.js

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Recipe = require('../../models/recipe');

//mongoose.connect('mongodb://localhost/recipes', { useNewUrlParser: true });
//const db = mongoose.connection;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ncdm:M4vaffanculomongodb_@cluster0-vikrf.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("recipes");
    // perform actions on the collection object
    console.log(collection.find());
    client.close();
});

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