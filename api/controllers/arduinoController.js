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
  new_task.save(function(err) {
    if (err)
      res.send(err);
  });
};

 
exports.count_measurement = function(req, res) {
  var c = 0;
  Task.count({}, function( err, count){
    c= count;
    res.send(count.toString());
  }).then(function (count) {
    console.log( "Number of records 2: ", count );
    return count;
  })
};

exports.read_last_measurement = function(req, res) {
  Task.findOne({}, { data: 1,_id:0}, { sort: { 'Created_date' : -1 } }, function(err, task) {
    if (err || !task)
      res.send("Error, no data available")
    else
      res.send(task.data);
  });
};

exports.delete_old = function(req, res) {
  Task.remove({Created_date: {$gte: Date.now+24*60*60}}, function(err, measurement) {
    if (err)
      res.send(err);
    else
      res.json({ message: 'All old measurement successfully deleted' });
  });
};  

exports.delete_all = function(req, res) {
  Task.remove({}, function(err, measurement) {
    if (err)
      res.send(err);
    else
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