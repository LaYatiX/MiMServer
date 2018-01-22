'use strict';
var helpers = require('../helpers/helpers.js');
var relay = require('../controllers/relaysController');
var arduinoController = require('../controllers/arduinoController');
var clientsData = [];
var clientsRelays = [];
var http = require('http');
var WebSocketServer = require('websocket').server;
var dataServer = http.createServer(function (req, res) { });
var relayServer = http.createServer(function (req, res) { });
var WebSocketPort = 1337;

var mongoose = require('mongoose'),
    Measurement = mongoose.model('Data');

var wsServer = new WebSocketServer({ 
    httpServer: dataServer //server for sending data
});

var relaysServer = new WebSocketServer({ 
    httpServer: relayServer  //server for sending data signals to manipulate relays
});

var messages = [];
wsServer.on('request', function (req) {
    var connection = req.accept(null, req.origin);

    var index = clientsData.push(connection) - 1;
    
    connection.on('message', function (message) {
        var msg = message.utf8Data;
        var records = msg.split("|");
        if(helpers.isRecordsValid(records)){
            /*records.forEach(record => {
                messages.push({ data: record });
            });
            Measurement.insertMany(messages, (err) => {
                if (!err) console.log("Records inserted in bulk");
                else console.log("Error inserting in bulk" + err);
            }).then(() => {
                console.log("bulk executed");
            })*/
        }
        else{
            helpers.sendInvalidDataErr(clientsData, msg);
            return;
        }
        for (let i = 0; i < clientsData.length; i++) {
            clientsData[i].sendUTF(msg);
        }
    })

    connection.on('close', function (con) {
        console.log('Connection closed');
    })
})
relaysServer.on('request', function (req) {
    var connection = req.accept(null, req.origin);

    var index = clientsRelays.push(connection) - 1;

    connection.on('message', function (message) {
        var msg = message.utf8Data;
        console.log(msg); 
        if(msg.length==8 && helpers.checkCommand(msg)){ //if relays request
            relay.create_record(msg);
            console.log("Switecher changed: " + msg);
        }
        else{
            helpers.sendInvalidDataErr(clientsRelays, msg);
            return;
        }
        for (let i = 0; i < clientsRelays.length; i++) {
            clientsRelays[i].sendUTF(msg);
        }
    })

    connection.on('close', function (con) {
        console.log('Connection closed');
    })
})
dataServer.listen(WebSocketPort, function () {
    console.log('WebSocket listening on: ' + WebSocketPort);
})
relayServer.listen(WebSocketPort+1, function () {
    console.log('WebSocket listening on: ' + (WebSocketPort+1));
})
module.exports.dataServer = dataServer;
module.exports.relayServer = relayServer;