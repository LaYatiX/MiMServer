
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
  

var ArduinoSchema = new Schema({ 
  data: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});
  
module.exports = mongoose.model('Data', ArduinoSchema);  