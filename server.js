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

mongoose.connect('mongodb://gobyn:0300159@ds059804.mongolab.com:59804/sport');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
	console.log('sport db opened');
});

var messageSchema = mongoose.Schema({
	message: String
});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
	console.log(messageDoc);
	console.log(err);
	//mongoMessage = messageDoc.message;
});


app.get('/partials/:partialPath', function(req, res){
	res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res){
	res.render('index', {
		mongoMessage: mongoMessage
	});
});

var port = 3030;
app.listen(process.env.PORT, process.env.IP);
console.log('Listening on port ' + port + '...');
console.log(process.env.IP);