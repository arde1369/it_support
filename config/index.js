var configValues = require('./config');

module.exports = {
    getDBConnectionString: function() {
        return `mongodb://${configValues.uname}:${configValues.pword}@ds157282.mlab.com:57282/_tickets`;
    }
}