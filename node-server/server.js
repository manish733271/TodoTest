var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');

var index = require('./routes/index').index;
var todos = require('./routes/todos').todos;

var app = express();


app.all("*/api/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//router
app.use('/api', index);
app.use('/api/v1/', todos);


//connection to angular folder
app.use(express.static(path.join(__dirname, '../dist')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//Get port from environment and store in Express.
const port = process.env.PORT || '3000';
app.set('port', port);


//Create HTTP server.
const server = http.createServer(app);

//Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`API running on localhost:${port}`));
