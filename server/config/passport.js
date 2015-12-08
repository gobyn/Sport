var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');

module.exports = function(){
    var User = mongoose.model('User');
    passport.use(new LocalStrategy(
    	function(username, password, done){
    		User.findOne({username:username}).exec(function(err, user) { // TODO: username uniek maken
    		    if(user && user.authenticate(password)){
    		    	return done(null, user); // TODO: let op: in de toekomst niet het hele user object naar client sturen, dit bevat salt, hashed_pwd, etc...
    		    }else{
    		    	return done(null, false);
    		    }
    		})
    	})
    );
    
    passport.serializeUser(function(user, done){
    	if(user){
    		done(null, user._id);
    	}
    });
    
    passport.deserializeUser(function(id, done){
    	User.findOne({_id:id}).exec(function(err, user){
    		if(user){
    			return done(null, user);
    		}else{
    			return done(null, false);
    		}
    	});
    });
}