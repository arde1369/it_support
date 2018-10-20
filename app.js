var express = require('express');
var apiController = require('./controllers/apiController');
var htmlController = require('./controllers/htmlController');
var mongoose = require('mongoose');
var config = require('./config');
var app = express();

var port = 8080;

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine','ejs');
mongoose.connect(config.getDBConnectionString(), {useNewUrlParser: true});

htmlController(app);
apiController(app);

app.listen(port);