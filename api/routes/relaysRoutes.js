
'use strict';
module.exports = function(app) {
    var relays = require('../controllers/relaysController');

    app.route('/api/relays/getall')
    .get(relays.read_all_states)

    app.route('/api/relays/getlatest')
    .get(relays.read_last_state)

    app.route('/api/relays/deleteall')
    .get(relays.delete_all)

} 