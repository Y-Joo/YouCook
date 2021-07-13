const mongoose = require('mongoose');
//ssda
const videosSchema = mongoose.Schema({
	videoId : String,
	channelId : String, // channelId
	thumbnails : String,
	title : String, // 로제 떡볶이를 만들어 보아요!
	channelTitle : String, // 백종원의 요리비책
	subscriberCount : Number, // 5145
	viewCount : Number,// 1360
	likeCount : Number, // 140
	dislikeCount : Number, // 4
	commentCount : Number, // 40
	description: [] // 1. 물 붓기, 2. 어쩌고, 3. 완성!
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