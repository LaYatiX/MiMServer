'use strict';

var mongoose = require('mongoose'),
  Task = mongoose.model('Data');

exports.read_all_measurements = function(req, res) {
  Task.find({ }, {data: 1, _id:0}, function(err, task) {
    if (err)
      res.send(err);
      var array = [];
      task.forEach(element => {
        array.push(element.data);
      }); 
    res.json(array); 
  });
};


exports.create_measurement = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task); 
  });
};

 
exports.read_last_measurement = function(req, res) {
  Task.findOne({}, {data: 1, _id:0}, { sort: { 'Created_date' : -1 } }, function(err, task) {
    if (err)
      res.send(err)
    res.json(task.data);
  });
};

exports.delete_all = function(req, res) {
  Measurement.remove({}, function(err, measurement) {
    if (err)
      res.send(err);
    res.json({ message: 'All measurement successfully deleted' });
  });
}; 

// exports.update_a_task = function(req, res) {
//   Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.delete_a_task = function(req, res) {
//   Task.remove({
//     _id: req.params.taskId
//   }, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Task successfully deleted' });
//   });
// };