var mongoose = require('mongoose');

module.exports = function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback(){
    	console.log('sport db opened');
    });
    
    var userSchema = mongoose.Schema({
    	firstName: String,
    	lastName: String,
    	username: String
    });
    var User = mongoose.model('User', userSchema);
    
    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            User.create({firstName:'Glenn', lastName:'Obyn', username:'gobyn'});
            User.create({firstName:'Johny', lastName:'legend', username:'jlegend'});
            User.create({firstName:'Tinne', lastName:'Wilms', username:'twilms'});
        }
    });
}