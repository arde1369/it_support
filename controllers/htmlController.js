var bodyParser = require('body-parser');
module.exports = function(app){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', function(req, res){
        res.render('index');
    });
    app.get('/createTicket', function(req,res){
        res.render('createTicket');
    });
    app.get('/admin_index', function(req,res){
        res.render('adminLogin');
    });
}