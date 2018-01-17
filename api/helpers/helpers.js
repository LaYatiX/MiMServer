'use strict';
module.exports.writeInBulk = function (messages) {
    Measurement.insertMany(messages, (err) => {
        if (!err) console.log("Records inserted in bulk");
        else console.log("Error inserting in bulk" + err);
    }).then(() => {
        console.log("bulk executed");
    })
}

module.exports.checkCommand = function (msg){
    for (let i = 0; i < msg.length; i++) {
        if(msg[i] !=0 && msg[i] != 1) return false
    }
    return true;
}
module.exports.sendInvalidDataErr = function (clients, msg){
    for (let i = 0; i < clients.length; i++) {
        clients[i].sendUTF("Invalid data format, message send: " + msg);
    }
    console.log("Invalid data format");
}
module.exports.isRecordsValid = function (records){
    for (let i = 0; i < records.length; i++) {
        if(records[i].split(";").length!=6)
        {
            console.log("Invalid data format");
            return false;
        } 
    }
    return true;
}

 