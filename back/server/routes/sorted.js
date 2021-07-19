const express = require('express');
const router = express.Router();
const { videos } = require("../models/videos");


router.get('', (req, res) => {
    videos.find({ weeklyViews: { $gt: 0 } }).sort("weeklyViews : -1").limit(10)
    .exec((err, data) =>{
        if (err) return res.status(400).send(err)
        return res.status(200).json({
            data
        })
    })
});

module.exports = router;