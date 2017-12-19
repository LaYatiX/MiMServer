var WebSocketServer = require('websocket').server;
var net = require('net');
var mysql = require('mysql');
var cors = require('cors')
var http = require('http');
var express = require('express'),
    app = express(),
  port = process.env.PORT || 8080;
var WebSocketPort = 1337;

var mongoose = require('mongoose');
var Data = require('./api/models/ardiunoDataModel');
var bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
var clients = [];
var server = http.createServer(function (req, res) {
}) 
  
server.listen(WebSocketPort, function () {
    console.log('HTTP and WebSocket listening ' + WebSocketPort);
})

wsServer = new WebSocketServer({
    httpServer: server
})

app.listen(port, function () {
    console.log('Express listening on port '+port+'!')
})
app.get('/',function(req,res){
    res.sendFile('public/index.html');
});
var routes = require('./api/routes/ardiunoDataRoutes'); //importing route
routes(app); //register the route

wsServer.on('request', function (req) {
    var connection = req.accept(null, req.origin);

    var index = clients.push(connection) - 1;

    connection.on('message', function (message) {
        var msg = message.utf8Data;
        for (let i = 0; i < clients.length; i++) {
            clients[i].sendUTF(msg);
        }
    })
 
    connection.on('close', function (con) {
        console.log('Connection closed');
    })
})