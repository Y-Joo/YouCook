const { ingredientsCategory } = require('./data');
const { ingredients } = require('../models/ingredients');
const { videos } = require('../models/videos');
const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
    return res.status(200).json({
        ingredientsCategory
    })
})

router.post('', (req, res) => {
    const ingredientsList = req.body.ingredientsList;
    const videoIdList = [];
    const videoList = [];
    for (const i in ingredientsList){
        const _ingredient = ingredientsList[i];
        ingredients.findOne({ ingredient : _ingredient })
        .exec((err, data) => {
            if (err) return res.status(400).send(err)
            videoIdList.push(data.videoIds);
            if (videoIdList.length == ingredientsList.length){
                console.log(videoIdList);
                let intersection = videoIdList.reduce((a, arr) => (
                    a.filter(num => arr.includes(num))
                ));
                console.log(intersection);
                for (const j in intersection){
                    console.log(j);
                    const videoId = intersection[j];
                    videos.findById(videoId)
                    .exec((err, video) => {
                        if (err) return res.status(400).send(err)
                        videoList.push(video);
                        console.log(videoList.length, intersection.length);
                        if (videoList.length == intersection.length){
                            return res.status(200).json({
                                videoList
                            })
                        }
                    })
                }
            }
        })
    }
})
module.exports = router;