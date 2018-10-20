var bodyParser = require('body-parser');
var tickets = require('../models/ticket');
var date = Date.now();
var alert = require('alert-node');
var _debug = false;

module.exports = function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/api/newTicket', function(req,res){
        var toggleStatus = req.body.urgent;
        if (req.body.urgent === "on"){
            toggleStatus = true;
        }
        else {
            toggleStatus = false;
        }
        var newTicket = tickets({
            requester: req.body.name,
            empID: req.body.empID,
            email: req.body.email,
            Description: req.body.description,
            status: "open",
            urgent: toggleStatus,
            date: date
        });
        if (_debug){
            console.log(newTicket);
        }
        newTicket.save(function(err){
            if (err){
                throw error;
            }
            else{
                alert(`\nTicket successfully created.\n\nTicket ID: ${newTicket._id}`);
                if (_debug){
                    console.log(`\nTicket successfully created.\n\nTicket ID: ${newTicket._id}`);
                }
                res.redirect(req.get('referer'));
            }
        });
    });

    app.post('/api/checkStatus',function(req,res){
        tickets.find({_id: req.body.ticketID}, function(err,ticket){
            if (_debug){
                console.log(ticket);
            }
            res.render('checkStatus', {ticket: ticket[0]});
        });
    });
    
}