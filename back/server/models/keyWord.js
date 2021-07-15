const mongoose = require('mongoose');

const keyWordSchema = mongoose.Schema({
    keyWord : String,
    videoIds : []
})

const keyWord = mongoose.model('keyWord', keyWordSchema);

module.exports = { keyWord }