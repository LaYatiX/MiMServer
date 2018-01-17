var mongoose = require('mongoose'),
relaysHistoryRecord = mongoose.model('relaysStatesHistory');

  exports.read_all_states = function(req, res) {
    relaysHistoryRecord.find({ }, {data: 1, _id:0}, function(err, record) {
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
    relaysHistoryRecord.findOne({}, {data: 1, _id:0}, { sort: { 'Created_date' : -1 } }, function(err, record) {
      if (err || record == null)
        res.send("Error, no data available")
      else
      res.send(record.data);
    });
  };

  exports.create_record = function(data) {
    var record = new relaysHistoryRecord({ data:data });
    record.save(function(err) {
      if (err)
        console.log("Error");
    });
  };

  exports.delete_all = function(req, res) {
    relaysHistoryRecord.remove({}, function(err, record) {
      if (err)
        res.send(err);
      res.json({ message: 'All record successfully deleted' });
    });
  }; 