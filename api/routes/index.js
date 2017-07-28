var express = require('express');
var router = express.Router();

var prospects = require('../controllers/prospects.js');

router
    .route('/prospects')
        .get(prospects.getProspects)
        .post(prospects.addProspect);

router
    .route('/prospects/:prospectId')
        .get(prospects.getProspect)
        .put(prospects.updateProspect)
        .delete(prospects.deleteProspect);

module.exports = router;