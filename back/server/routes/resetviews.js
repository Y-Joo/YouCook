const { videos } = require("../models/videos");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const config = require("../config/key");
var express = require('express');
const app = express();
app.use(bodyParser.json());

const connect = mongoose.connect(config.mongoURI,
    {
      useNewUrlParser: true, useUnifiedTopology: true,
      useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

videos.updateMany({ weeklyViews: { $gt: 0 } })
.exec((err, data) => {
    if (err) console.log(err);
    console.log(data);
})
videos.find({  })