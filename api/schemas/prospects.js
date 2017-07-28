var mongoose = require('mongoose');

const prospectSchema = new mongoose.Schema({
    email : {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    ip_address : {
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
