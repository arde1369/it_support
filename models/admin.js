var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var adminSchema = new Schema({
    name: String,
    empID: String,
    username: String,
    password: String
});

var Admins = mongoose.model('administrator_accounts', adminSchema);

module.exports = Admins;
