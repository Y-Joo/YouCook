var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
  
const port = 5000;
app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});
module.exports = router;
