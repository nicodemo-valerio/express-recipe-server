const express = require('express');
const app = express();
//const exphbs = require('express-handlebars');
const recipe = require('./models/recipe');

//app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
//app.set('view engine', 'handlebars');

/* app.get('/', (req, res) => {
    recipe.getRecipes((err, recipes) => {
        if (err) {
            throw err;
        } else {
            res.render('index',
                {
                    title: 'Recipes',
                    recipes
                });
        }
    });
}); */

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/recipes', require('./routes/api/recipes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
});