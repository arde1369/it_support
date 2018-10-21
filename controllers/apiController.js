var bodyParser = require('body-parser');
var tickets = require('../models/ticket');
var admin = require('../models/admin');
var date = Date.now();
var alert = require('alert-node');
var _debug = false;
var session = require('express-session');
var crypt = require('password-hash-and-salt');
var alert = require('alert-node');


module.exports = function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({ secret:'1qaz!QAZ2wsx@WSX',
                        resave: false,
                        saveUninitialized: true,
                        cookie: { path: '/', maxAge: 600000, secure: false, httpOnly: false } 
                    })
    );

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
            if(err) throw error;
            if (_debug){
                console.log(ticket);
            }
            res.render('checkStatus', {ticket: ticket[0]});
        });
    });

    app.post('/api/admin_login', function(req,res){
        admin.find({ username: req.body.username }, function(err, admin_info){
            if (err) throw error;
            else {
                if(_debug){
                    console.log(req.body.username);
                    console.log(req.body.password);
                    console.log(admin_info);
                }
                /*crypt(req.body.password).verifyAgainst(admin_info[0].password, function(error, verified) {
                    if(error)
                        throw new Error('Something went wrong!');
                    if(!verified) {
                        alert("\nInvalid Credentials!\nPlease Try again...");
                        res.redirect(req.get('referer'));
                    } else {
                        //place the next steps in here
                    }
                });*/
                req.session.username = admin_info[0].username;
                req.session.save();
                res.render('adminIndex', {username: req.session.username});
            }
        });
    });
    
}