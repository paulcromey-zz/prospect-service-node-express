var express = require('express');
var router = express.Router();

var hotels = require('../controllers/hotels.js');
var reviews = require('../controllers/reviews.js');
var prospects = require('../controllers/prospects.js');

router
    .route('/hotels')
        .get(hotels.getHotels)
        .post(hotels.addHotel);

router
    .route('/hotels/:hotelId')
        .get(hotels.getHotel)
        .put(hotels.updateHotel)
        .delete(hotels.deleteHotel);

router
    .route('/hotels/:hotelId/reviews')
        .get(reviews.getReviews)
        .post(reviews.addReview);

router
    .route('/hotels/:hotelId/reviews/:reviewId')
        .get(reviews.getReview)
        .put(reviews.updateReview)
        .delete(reviews.deleteReview);

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