var mongoose = require('mongoose');

var prospectSchema = new mongoose.Schema({
    email : {
      type : String,
      required : true 
    },
    ipAddress : {
      type : String,
      required : true 
    },
    token : {
      type : String,
      required : true 
    },
    source : {
      type : String,
      required : true 
    },
    createdOn : {
        type : Date,
        "default" : Date.now
    },
    updatedOn : {
        type : Date,
        "default" : Date.now
    }
});

mongoose.model('Prospect', prospectSchema);
