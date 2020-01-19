var express = require("express");
var mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));

//make way for some custom css, js and images
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.use('/pages', express.static(__dirname + '/public/pages'));

let db;
let url = 'mongodb://localhost:27017/';

MongoClient.connect(url, (err, database) => {
  if(err){
    return console.log(err);
  }

  db = database.db("uniopps");

  app.listen(8081, () => {
    console.log('started on 8081');
  });
});

app.use(bodyParser.json());

var router = express.Router();

router.use(function(req, res, next){
  next();
});


// add a document to the DB collection recording the click event
app.post('/pages/input', (req, res) => {
  const click = {
    organizationName: req.body.organizationName,
    sponsorName: req.body.sponsorName,
    appDate: req.body.appDate,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    website: req.body.website,
  }

  db.collection('opps').insertOne(click, (err, result) => {
    if (err) {
      return console.log(err);
    }
    res.sendStatus(201);
  });

});

var query;
//get the data from the search bar thing
app.post('/pages/search', (req, res) => {
  query = req.body.data;
  console.log(req.body.data);
  res.send(req.body.data);
});

//Get information from the mongodb database and print it to the page
app.get('/pages/search', (req, res) => {
  //{ $text: { $search: query } }
  db.collection('opps').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

app.use('/', router);
