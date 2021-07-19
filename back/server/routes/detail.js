const { videos } = require("../models/videos");
const express = require('express');
const router = express.Router();
router.get('/:videoId', (req, res) => {
    videos.findOne({videoId : req.params.videoId})
    .exec((err, video) => {
        if (err) return res.status(400).send(err)
        videos.updateOne({
            videoId : req.params.videoId}, 
            {$set:
                { weeklyViews : video.weeklyViews + 1 }
            })
        .then((result) => {
            console.log(result);
            return res.status(200).json({
                video
            })
        })
        .catch((err) => {
            console.log(err);
    })
    })
})
module.exports = router;