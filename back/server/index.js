var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const config = require("./config/key");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

/* GET home page. */
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
  
const port = 5000;

app.use(cors())
app.use(bodyParser.json());

app.use('/api/search/keyword', require('./routes/keyword'));
app.use('/api/search/detail', require('./routes/detail'));
app.use('/api/search/sorted', require('./routes/sorted'));

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});
