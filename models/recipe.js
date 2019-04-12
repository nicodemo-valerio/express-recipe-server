/**
 * recipe.js
 */
const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    recipe: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    steps: {
        type: Array,
        required: true
    },
    isInEdit: {
        type: Boolean,
        required: false
    }
}
);

const Recipe = module.exports = mongoose.model('Recipe', recipeSchema);

module.exports.getRecipes = (callback, limit) => {
    Recipe.find(callback).limit(limit);
}

module.exports.addRecipe = (recipe, callback) => {
    Recipe.create(recipe, callback);
}

module.exports.updateRecipe = (id, recipe, options, callback) => {
    const query = { _id: id };
    Recipe.findOneAndUpdate(query, recipe, options, callback);
}

module.exports.deleteRecipe = (id, options, callback) => {
    Recipe.findByIdAndDelete(id, options, callback);
}