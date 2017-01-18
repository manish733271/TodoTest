var express = require('express');
var index = express.Router();

index.get('/', function(req, res, next){
    res.send('Index is home');
    // res.render('index.html');
});

module.exports.index = index;