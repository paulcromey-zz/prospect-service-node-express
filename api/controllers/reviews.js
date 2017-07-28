var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var FOUR_ZERO_FOUR_MESSAGE = "Not Found";

module.exports.getReviews = function(req, res) {
	
	Hotel.findById(req.params.hotelId).exec(function(err, hotel) {
		if(hotel.reviews){
			res.status(200).json(hotel.reviews);
		} else {
			res.status(404).json({
				"message" : FOUR_ZERO_FOUR_MESSAGE
			});
		}
	});
		
};

module.exports.getReview = function(req, res) {
	
	Hotel.findById(req.params.hotelId).exec(function(err, hotel) {
		if(hotel.reviews.id(req.params.reviewId)){
			res.status(200).json(hotel.reviews.id(req.params.reviewId));
		} else {
			res.status(404).json({
				"message" : FOUR_ZERO_FOUR_MESSAGE
			});
		}
	});
		
};

var _addReview = function(req, res, hotel) {
	hotel.reviews.push({
		name : req.body.name,
		rating : parseInt(req.body.rating, 10),
		review : req.body.review
	});
	
	hotel.save(function(err, hotelUpdated){
		if (err) {
			res.status(500).json(err);
		} else {
			res.status(201).json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
		}
	});
};

module.exports.addReview = function(req, res) {
	console.log("POST new review");
	Hotel
		.findById(req.params.hotelId)
		.select('reviews')
		.exec(function(err, hotel) {
			var response = {
				status : 200,
				message : []
			};
			if (err) {
				response.status = 500;
				response.message = err;
			} else if (!hotel) {
				response.status = 404;
				response.message = {
					"message" : "Hotel ID not found " + req.params.hotelId
				};
			} 
			if (hotel) {
				_addReview(req, res, hotel);
			} else {
				res
					.status(resonse.status)
					.json(response.message);
			}
		});
};

module.exports.updateReview = function(req, res) {
	console.log("UPDATE review");
	Hotel
    .findById(req.params.hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      var thisReview;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!hotel) {
        console.log("Hotel id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      } else {
        // Get the review
        thisReview = hotel.reviews.id(reviewId);
        // If the review doesn't exist Mongoose returns null
        if (!thisReview) {
          response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        thisReview.name = req.body.name;
        thisReview.rating = parseInt(req.body.rating, 10);
        thisReview.review = req.body.review;
        hotel.save(function(err, hotelUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });
};

module.exports.deleteReview = function(req, res) {
	console.log("DELETE review");
	var hotelId = req.params.hotelId;
  	var reviewId = req.params.reviewId;
	Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      var thisReview;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!hotel) {
        console.log("Hotel id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      } else {
        // Get the review
        thisReview = hotel.reviews.id(reviewId);
        // If the review doesn't exist Mongoose returns null
        if (!thisReview) {
          response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        hotel.reviews.id(reviewId).remove();
        hotel.save(function(err, hotelUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });
};

