var express = require('express');
var apiController = require('./controllers/apiController');
var htmlController = require('./controllers/htmlController');
var app = express();

var port = 8080;

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine','ejs');

htmlController(app);
apiController(app);

app.listen(port);