var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path){
	return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser());
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
}));

app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://' + process.env.IP + '/sport');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
	console.log('sport db opened');
});

var playerSchema = mongoose.Schema({
	lastName: String,
	firstName: String
});
var Player = mongoose.model('Player', playerSchema);
var mongoMessage;
Player.findOne().exec(function(err, playerDoc){
	console.log(playerDoc);
	console.log(err);
	mongoMessage = "Player: " + playerDoc.lastName + " " + playerDoc.firstName;
});


app.get('/partials/:partialPath', function(req, res){
	res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res){
	res.render('index', {
		mongoMessage: mongoMessage
	});
});

var port = process.env.PORT;
app.listen(port, process.env.IP);
console.log('Listening on port ' + port + '...');