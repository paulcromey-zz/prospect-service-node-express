require('./api/data/db.js');
const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');

var bodyParser = require('body-parser');

const routes = require('./api/routes');

const Console = require('console').Console;
const logger = new Console(fs.createWriteStream('./log/stdout.log'), fs.createWriteStream('./log/stderr.log'));

app.set('port', 3000);

app.use(function(req, res, next){
	logger.info(req.method, req.url);
	next();
});

app.use(bodyParser.urlencoded( { extended : false } ));

app.use('/api', routes);

app.get('/file', function(req, res) {
	res.status(200).sendFile(path.join(__dirname, 'app.js'));
});

app.get('/api/stdout', function(req, res) {
	res.status(200).sendFile(path.join(__dirname, 'log/stdout.log'));
});

app.get('/api/stderr', function(req, res) {
	res.status(200).sendFile(path.join(__dirname, 'log/stderr.log'));
});

const server = app.listen(process.env.PORT || app.get('port'), function() {
	var port = server.address().port;
	logger.info('Magic happens on port ' + port);
});  

module.exports = server;
