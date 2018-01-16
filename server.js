require('./api/models/ardiunoDataModel');
require('./api/models/commutatorsModel');
require('./api/controllers/WebSocketController'); //importing server
var net = require('net');
var mysql = require('mysql');
var cors = require('cors');
var express = require('express'),
app = express(),
port = process.env.PORT || 8080;
var WebSocketPort = 1337;

var mongoose = require('mongoose');
var bodyParser = require('body-parser'); 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017', {useMongoClient: true}, function (error) {
    !error ? console.log("Connected to MongoDB on port: 27017") : console.log("Error " + error);
}); 
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.listen(port, function () {
    console.log('HTTP listening on '+port);
})
app.get('/',function(req,res){
    res.sendFile('/index.html');
});

var routes = require('./api/routes/ardiunoDataRoutes'); //importing route
routes(app); //register the route
routes = require('./api/routes/commutatorsRoutes'); //importing route
routes(app); //register the route