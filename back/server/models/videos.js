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
	weeklyViews : Number,
	description : [],
	ingredientsArr : []
})

const videos = mongoose.model('videos', videosSchema);


module.exports = { videos }