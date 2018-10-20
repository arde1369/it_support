var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ticketSchema = new Schema({
    requester: String,
    empID: String,
    email: String,
    Description: String,
    status: String,
    urgent: Boolean,
    date: Date
});

var Tickets = mongoose.model('tickets', ticketSchema);

module.exports = Tickets;