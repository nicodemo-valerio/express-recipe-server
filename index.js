// index.js
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/recipes', require('./routes/api/recipes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
});