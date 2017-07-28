var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res){

	var lon = parseFloat(req.query.lon);
	var lat = parseFloat(req.query.lat);
	
	var point = {
		type : "Point",
		coordinates : [lon, lat]
	};

	var geoOptions = {
		spherical : true,
		maxDistance : 20000,
		num : 5
	}

	Hotel.geoNear(point, geoOptions, function(err, results, stats){
		console.log("GEO " + err);
		res.status(200).json(results);
	});
};

module.exports.getHotels = function(req, res) {

	var maxCount = 10;

	if (req.query && req.query.lon & req.query.lat) {
		runGeoQuery(req, res);
		return;
	}

	if(isNaN(_offset(req)) || isNaN(_count(req))){
		res.status(400).json({
			"message" : "offset or count should be numbers"
		})
		return;
	}

	if(_count(req) > maxCount){
		res.status(400).json({
			"message" : "count limit exceeded"
		})
		return;
	}
	
	Hotel.find().skip(_offset(req)).limit(_count(req)).exec(function(err, hotels) {
		if(err){
			res.status(500).json(err);
		} else {
			res.status(200).json(hotels);
		}
	});
		
};

module.exports.getHotel = function(req, res) {
	
	Hotel.findById(req.params.hotelId).exec(function(err, hotel) {
		var response = {
			status : 200,
			message : hotel
		};
		if (err) {  
			response.status = 500;
			response.message = err;
		} else if (!hotel) {
			response.status = 404;
			response.message = {
				"message" : "Hotel ID not found"
			};
		} 
		res.status(response.status).json(response.message);
	});
		
};

module.exports.addHotel = function(req, res) {
	console.log("POST new hotel");
	if (req.body && req.body.name && req.body.stars){
		console.log(req.body);
		Hotel
			.create({
				name : req.body.name,
				description : req.body.description,
				stars : parseInt(req.body.stars, 10),
				services : _splitArray(req.body.services),
				photos : _splitArray(req.body.photos),
				currency : req.body.currency,
				location : {
					address : req.body.address,
					coordinates : [
						parseFloat(req.body.lon), 
						parseFloat(req.body.lat)
					]
				}
			}, function(err, hotel) {
				if (err) {
					res.status(400).json(err);
				} else {
					res.status(201).json(hotel);
				}
		});
	} else {
		console.log("Data missing from body");
		res.status(400).json({ message : "Required data missing from body" });
	}
};

module.exports.updateHotel = function(req, res) {
	console.log("UPDATE hotel");
	Hotel.findById(req.params.hotelId)
		.select("-reviews -rooms")
		.exec(function(err, hotel) {
		var response = {
			status : 200,
			message : hotel
		};
		if (err) {  
			response.status = 500;
			response.message = err;
		} else if (!hotel) {
			response.status = 404;
			response.message = {
				"message" : "Hotel ID not found"
			};
		} 
		if (response.status !== 200) {
			res.status(response.status).json(response.message);
		} else {
			hotel.name = req.body.name;
			hotel.description = req.body.description;
			hotel.stars = parseInt(req.body.stars, 10);
			hotel.services = _splitArray(req.body.services);
			hotel.photos = _splitArray(req.body.photos);
			hotel.currency = req.body.currency;
			/*hotel.location = {
				address : req.body.address,
					coordinates : [
						parseFloat(req.body.lon), 
						parseFloat(req.body.lat)
					]
				};*/
			hotel.save(function(err, updateHotel){
				if(err){
					res.status(500).json(err);
				} else {
					res.status(204).json();
				}
			});
		}
	});
};

module.exports.deleteHotel = function(req, res) {
	console.log("DELETE hotel");
	Hotel.findByIdAndRemove(req.params.hotelId)
		.exec(function(err, hotel){
			if(err){
				res.status(404).json(err);
			} else {
				res.status(204).json();
			}
		});
};

var _offset = function(req) {
	if (req.query && req.query.offset) {
		return parseInt(req.query.offset, 10);
	} else {
		return 0; // default 0
	}
};

var _count = function(req) {
	if (req.query && req.query.count) {
		return parseInt(req.query.count, 10);
	} else {
		return 5; // default 5
	}
};

var _splitArray = function(input) {
	var output;
	if(input && input.length > 0) {
		output = input.split(";");
	} else {
		output = [];
	}
	return output;
};

