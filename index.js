require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const mongodb = require("mongodb");

// Basic Configuration
//mongoose.connect(process.env.MONGO_URI,{});
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

//creating apis  post
app.post("/api/shorturl",(req,res)=>{
  console.log("body",req.body);
  console.log("protocal",req.protocol + '://' + req.get('host') + req.originalUrl);
  console.log(req.url);
  var long_url = req.body["url"];

  res.json({original_url:long_url,short_url:"url"});
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
