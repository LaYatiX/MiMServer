'use strict';
module.exports = function(app) {
  var arduino = require('../controllers/arduinoController');
  var cors = require('cors');
// app.use(cors);
app.route('/api/send')
.post(arduino.create_measurement);

app.route('/api/getall')
.get(arduino.read_all_measurements);

app.route('/api/delete')
.delete(arduino.delete_all);

app.route('/api/delete')
.get(arduino.delete_all);

app.route('/api/countRecords')
.get(arduino.count_measurement);

app.route('/api/getlatest')
    .get(arduino.read_last_measurement)
};   