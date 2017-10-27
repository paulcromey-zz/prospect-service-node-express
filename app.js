require('./api/data/db.js');
const express = require('express');
const app = express();

var bodyParser = require('body-parser');

const routes = require('./api/routes');

app.set('port', 3000);

app.use(function(req, res, next){
	//logger.info(req.method, req.url);
	next();
});

app.use(bodyParser.urlencoded( { extended : false } ));

app.use('/api', routes);

const server = app.listen(process.env.PORT || app.get('port'), function() {
	var port = server.address().port;
	//logger.info('Magic happens on port ' + port);
});
