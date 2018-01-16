var mongoose = require('mongoose'),
CommutatorsHistoryRecord = mongoose.model('CommutatorsStatesHistory');

  exports.read_all_states = function(req, res) {
    CommutatorsHistoryRecord.find({ }, {data: 1, _id:0}, function(err, record) {
      if (err)
        res.send(err);
        var array = [];
        record.forEach(element => {
          array.push(element.data);
        });
      res.json(array); 
    });
  };

  exports.read_last_state = function(req, res) {
    CommutatorsHistoryRecord.findOne({}, {data: 1, _id:0}, { sort: { 'Created_date' : -1 } }, function(err, record) {
      if (err)
        res.send(err)
      res.send(record.data);
    });
  };

  exports.create_record = function(data) {
    var record = new CommutatorsHistoryRecord({ data:data });
    record.save(function(err, record) {
      if (err)
        console.log("Error");
    });
  };