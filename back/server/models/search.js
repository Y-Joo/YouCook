const mongoose = require('mongoose');

const search_schema = mongoose.Schema({
    search_word: String,
    videos: { },
})

const search = mongoose.model('search', search_schema);

module.exports = { search }