const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    recipe: {
        type: String,
        required: true
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
    const update = {
        recipe: recipe.recipe
    }
    Recipe.findOneAndUpdate(query, update, options, callback);
}

module.exports.deleteRecipe = (id, options, callback) => {
    const query = { _id: id };
    Recipe.findByIdAndDelete(id, options, callback);
}