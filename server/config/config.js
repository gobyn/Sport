var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://' + process.env.IP + '/sport',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://gobyn:gobyn123@ds059804.mongolab.com:59804/sport',
        port: process.env.PORT || 80
    }
}