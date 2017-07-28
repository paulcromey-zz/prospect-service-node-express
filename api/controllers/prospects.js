const moment = require('moment');
const jwt = require('jsonwebtoken');
const uuidv1 = require('uuid/v1');
const mongoose = require('mongoose');

const Prospect = mongoose.model('Prospect');

module.exports.getProspects = function(req, res) {

	console.log("GET Prospects");

	var maxCount = 10;

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
	
	Prospect.find().skip(_offset(req)).limit(_count(req)).exec(function(err, prospects) {
		if(err){
			res.status(500).json(err);
		} else {
			res.status(200).json(prospects);
		}
	});
		
};

module.exports.getProspect = function(req, res) {
	console.log("GET Prospect");
	Prospect.findById(req.params.prospectId).exec(function(err, prospect) {
		var response = {
			status : 200,
			message : prospect
		};
		if (err) {  
			response.status = 500;
			response.message = err;
		} else if (!prospect) {
			response.status = 404;
			response.message = {
				"message" : "Prospect ID not found"
			};
		} 
		res.status(response.status).json(response.message);
	});
		
};

module.exports.addProspect = function(req, res) {
	console.log("POST Prospect");
    if (req.body 
        && req.body.email 
        && req.body.ip_address 
        && req.body.source){
		Prospect.find({email: req.body.email}).exec(function(err, prospects) {
			if (err) {  
				res.status(500).json(err);
				return;
			} 
			if(prospects.length < 5){
				console.log("CREATE Prospect");
				Prospect
					.create({
						uuid : uuidv1(),
						email : req.body.email,
						ip_address : req.body.ip_address,
						token : jwt.sign({ email: req.body.email }, 'mean'),
						source : req.body.source
						}, function(err, prospect) {
							if (err) {
								res.status(400).json(err);
							} else {
								res.status(201).json(prospect);
							}
					});	
			} else {
				res.status(403).json({
					"message" : "Too many pending requests"
				});
			}
			
		});
	} else {
		console.log("Data missing from body");
		res.status(400).json({ message : "Required data missing from body" });
	}
};

module.exports.updateProspect = function(req, res) {
	console.log("UPDATE prospect");
	Prospect.findById(req.params.prospectId)
		.exec(function(err, prospect) {
		var response = {
			status : 200,
			message : prospect
		};
		if (err) {  
			response.status = 500;
			response.message = err;
		} else if (!prospect) {
			response.status = 404;
			response.message = {
				"message" : "Prospect ID not found"
			};
		} 
		if (response.status !== 200) {
			res.status(response.status).json(response.message);
		} else {
			prospect.email = req.body.email,
			prospect.ip_address = req.body.ip_address,
            prospect.token = req.body.token,
            prospect.source = req.body.source
            prospect.updatedOn = moment().toISOString();
			prospect.save(function(err, updateProspect){
				if(err){
					res.status(500).json(err);
				} else {
					res.status(204).json();
				}
			});
		}
	});
};

module.exports.deleteProspect = function(req, res) {
	console.log("DELETE prospect");
	Prospect.findByIdAndRemove(req.params.prospectId)
		.exec(function(err, prospect){
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

