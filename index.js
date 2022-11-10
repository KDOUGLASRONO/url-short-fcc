require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const url_shortener = require("node-url-shortener");

// Basic Configuration
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true},(err,success)=>{
  if(err) console.log(err);
  else{
    console.log("connected");
  }
});
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
//locally using arrays
var originalUrls = [];
var shortUrls = [];
//var short = [];
//creating apis  post
app.post("/api/shorturl",(req,res)=>{
  console.log("body",req.body.url); // same console.log("body",req.body["url"]);
  console.log("protocal",req.protocol + '://' + req.get('host') + req.originalUrl);
  console.log(req.url);
  var long_url = req.body["url"];
  //test url validity function
  const isValidUrl = urlString=> {
	  	var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
	  return !!urlPattern.test(urlString);
	}
  //custom short urls
  const url = req.body.url;
  function urlshortener(x){
    var xarray = x.split("/");
    console.log("xarray",xarray);
    var surl = "";
    for(var i =0;i<xarray.length;i++){
      surl = surl + xarray[i].split("")[0];
      i++;
    }
    const symbols = ['!','@','*','&','^','#','%',')','(','~']
    surl = surl + Math.floor(Math.random()*10) + symbols[Math.floor(Math.random()*symbols.length)];
    console.log(surl);
    return surl;
  }
  urlshortener(url);
  //ammending arrays
  const foundIndex = originalUrls.indexOf(url);
  console.log("url status",isValidUrl(url));
  if(!isValidUrl(url)){
    console.log("url not valid");
    res.json({error:"Invalid url"});
  }
  else{
    if(foundIndex<0){
      originalUrls.push(url);
      shortUrls.push(shortUrls.length);
      return res.json({
        original_url:url,
        short_url:urlshortener(url)
      })
    }
    originals.push(req.body.url);
    

    res.json({original_url:long_url,short_url:urlshortener(url)});
 } //short_url:shortUrls[foundIndex]
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
