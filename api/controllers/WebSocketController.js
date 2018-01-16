'use strict';

var clients = [];
var http = require('http');
var thunkify = require('thunkify');
var WebSocketServer = require('websocket').server;
var server = http.createServer(function (req, res) { });
var WebSocketPort = 1337;

var mongoose = require('mongoose'),
    Measurement = mongoose.model('Data');
var Commutator = require('../controllers/commutatorsController');


var wsServer = new WebSocketServer({ 
    httpServer: server
});
var messages = [];
wsServer.on('request', function (req) {
    var connection = req.accept(null, req.origin);

    var index = clients.push(connection) - 1;

    connection.on('message', function (message) {
        var msg = message.utf8Data;
        console.log(msg); 
        if(msg.length==8){ //if commutators request
            Commutator.create_record(msg);
            console.log("Switecher changed: " + msg);
        }
        else if(msg.split(";").length==6){
            messages.push({ data: msg });
            if (messages.length >= 1000) {
                function* bar() {
                    try {
                        var x = yield writeToDb(messages);
                    } catch (err) {
                        throw err;
                    } 
                    console.log(x);
                }
                var gen = bar();
                gen.next().value(function (err, data) {
                    if (err) gen.throw(err);
                    gen.next();
                })
                messages = [];
            }
        }
        else{
            for (let i = 0; i < clients.length; i++) {
                clients[i].sendUTF("Invalid data format");
            }
            console.log("Invalid data format");
            return;

        }
        for (let i = 0; i < clients.length; i++) {
            clients[i].sendUTF(msg);
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

function writeInBulk(messages) {
    Measurement.insertMany(messages, (err) => {
        if (!err) console.log("Records inserted in bulk");
        else console.log("Error inserting in bulk" + err);
    }).then(() => {
        console.log("bulk executed");
    })
}
var writeToDb = thunkify(writeInBulk);