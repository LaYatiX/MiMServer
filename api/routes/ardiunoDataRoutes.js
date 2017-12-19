'use strict';
module.exports = function(app) {
  var arduino = require('../controllers/arduinoController');

  // arduino Routes
app.route('/api/send')
.post(arduino.create_measurement);

app.route('/api/getall')
.get(arduino.read_all_measurements)

app.route('/api/getlatest')
    .get(arduino.read_last_measurement)
};  