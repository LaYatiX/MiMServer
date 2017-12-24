'use strict';

var clients = [];
var http = require('http');
var WebSocketServer = require('websocket').server;
var server = http.createServer(function (req, res) {});
var WebSocketPort = 1337;

var mongoose = require('mongoose'),
    Measurement = mongoose.model('Data');

var wsServer = new WebSocketServer({
    httpServer: server
});
var messages = [];
wsServer.on('request', function (req) {
    var connection = req.accept(null, req.origin);

    var index = clients.push(connection) - 1;

    connection.on('message', function (message) {
        var msg = message.utf8Data;
        for (let i = 0; i < clients.length; i++) {
            clients[i].sendUTF(msg);
        }

        // console.log("Got message " + message.utf8Data);
        messages.push({data: msg});
        if(messages.length>=1000){
                Measurement.insertMany(messages, (err)=>{
                    if(!err) console.log("Records inserted in bulk");
                    else console.log("Error inserting in bulk" + err);
                }).then(()=>{
                    console.log("bulk executed");
                })
            messages = [];
        }        
    })
 
    connection.on('close', function (con) {
        console.log('Connection closed');
    })
})
server.listen(WebSocketPort, function () {
    console.log('WebSocket listening on: ' + WebSocketPort);
})
module.exports.server = server; 