'use strict';

var mongoose = require('mongoose'),
  Measurement = mongoose.model('Data');

exports.read_all_measurements = function(req, res) {
  Measurement.find({ }, {data: 1, _id:0}, function(err, measurement) {
    if (err)
      res.send(err);
      var array = [];
      measurement.forEach(element => {
        array.push(element.data);
      });
    res.json(array); 
  });
};


exports.create_measurement = function(req, res) {
  var new_measurement = new Measurement(req.body);
  console.log(req.body);
  
  new_measurement.save(function(err, measurement) {
    if (err)
      res.send(err);
    res.json(measurement); 
  }); 
};
 
exports.read_last_measurement = function(req, res) {
  Measurement.findOne({}, {data: 1, _id:0}, { sort: { 'Created_date' : -1 } }, function(err, measurement) {
    if (err)
      res.send(err);
    if(measurement)
      res.send(measurement.data);
    else
    res.send("Database is empty");
  });
};

// exports.update_a_measurement = function(req, res) {
//   Measurement.findOneAndUpdate({_id: req.params.measurementId}, req.body, {new: true}, function(err, measurement) {
//     if (err)
//       res.send(err);
//     res.json(measurement);
//   });
// // };


exports.delete_all = function(req, res) {
  Measurement.remove({}, function(err, measurement) {
    if (err)
      res.send(err);
    res.json({ message: 'All measurement successfully deleted' });
  });
}; 