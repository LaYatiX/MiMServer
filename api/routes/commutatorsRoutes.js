
'use strict';
module.exports = function(app) {
    var commutators = require('../controllers/commutatorsController');

    app.route('/api/commutators/getall')
    .get(commutators.read_all_states)

    app.route('/api/commutators/getlatest')
    .get(commutators.read_last_state)

}