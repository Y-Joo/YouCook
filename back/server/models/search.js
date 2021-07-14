const mongoose = require('mongoose');
//ssda
const videosSchema = mongoose.Schema({
	videoId : String,
	channelId : String,
	thumbnails : String,
	title : String,
	channelTitle : String,
	subscriberCount : Number,
	viewCount : Number,
	likeCount : Number,
	dislikeCount : Number,
	commentCount : Number,
	description : [],
	ingredientsArr : []
})

const videos = mongoose.model('videos', videosSchema);

const ingredientsSchema = mongoose.Schema({
    ingredient : String,
    videoIds : []
})

const ingredients = mongoose.model('ingredients', ingredientsSchema);

const keyWordSchema = mongoose.Schema({
    keyWord : String,
    videoIds : []
})

const keyWord = mongoose.model('keyWord', keyWordSchema);

const engagementSchema = mongoose.Schema({
    videoId : String,
    clickCount : Number
})

const engagement = mongoose.model('engagement', engagementSchema);

module.exports = { videos, ingredients, keyWord }