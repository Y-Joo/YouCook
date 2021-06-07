const mongoose = require('mongoose');

const video_schema = mongoose.Schema({
    title: String,
    video_id:String,
    channel_id: String,
    thumbnail:String,
    channel_name: String,
    subscribe:Number,
    view:Number,
    like:Number,
    dislike:Number,
    comment:Number,
})

const video = mongoose.model('video', video_schema);

module.exports = { video }