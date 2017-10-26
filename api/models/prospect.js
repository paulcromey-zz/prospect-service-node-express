var dynamoose = require('dynamoose');

// Create cat model with default options
var Prospect = dynamoose.model('Prospect', {
    uuid: String,
    email: String,
    ip_address: String
});

module.exports = Prospect;

