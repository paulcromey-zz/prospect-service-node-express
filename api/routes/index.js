var express = require('express');
var router = express.Router();

var hotels = require('../controllers/hotels.js');
var reviews = require('../controllers/reviews.js');

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

module.exports = router;