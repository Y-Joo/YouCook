const mongoose = require('mongoose');

const ingredientsSchema = mongoose.Schema({
    ingredient : String,
    videoIds : []
})

const ingredients = mongoose.model('ingredients', ingredientsSchema);

module.exports = { ingredients }