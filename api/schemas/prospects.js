const mongoose = require('mongoose');

const prospectSchema = new mongoose.Schema({
    uuid: {
        type: String
    },
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
      type : String
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

const ProspectSchema = mongoose.model('Prospect', prospectSchema);

module.exports = ProspectSchema;
