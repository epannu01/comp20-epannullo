var express = require('express');
var bodyParser = require('body-parser'); // Required if we need to use HTTP post parameters
var validator = require('validator'); // See documentation at https://github.com/chriso/validator.js
var app = express();
const path = require('path')
// See https://stackoverflow.com/questions/5710358/how-to-get-post-query-in-express-node-js
app.use(bodyParser.json());
// See https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
app.use(bodyParser.urlencoded({ extended: true })); // Required if we need to use HTTP post parameters

// Mongo initialization and connect to database
// process.env.MONGODB_URI is the default environment variable on Heroku for the MongoLab add-on
// If environment variables not found, fall back to mongodb://localhost/nodemongoexample
// nodemongoexample is the name of the local database
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/2048gameserver';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});

app.post("/submit", function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "X-Requested-With");
	var search = request.body.search;
	var time = new Date();

	var toInsert = {
		"search": search,
		"created_at": time
	};

	db.collection('searches', function(error, coll) {
		coll.insert(toInsert, function(error, saved) {
			if (error) {
				response.send(500);
			}
			else {
				response.send('<html><head><title>Thank you!</title></head><body><h2>Thanks for your submission!</h2></body></html>');
			}
	    });
	});

});

app.get("/", function(request, response) {
	response.set('Content-Type', 'text/html');
	var indexPage = '';

	// Line 50: equivalent to `db.scores` in MongoDB client shell
	db.collection('searches', function(er, collection) {

		// Line 53: equivalent to `db.scores.find()` in MongoDB client shell
		collection.find().toArray(function(err, results) {


			if (!err) {
				indexPage += "<!DOCTYPE HTML><html><head><title>Top Searches</title></head><body><h1>Number of searches</h1>";
				indexPage +="<h1>" + results.length + "</h1>"
				// for (var count = 0; count < results.length; count++) {
				//  	//indexPage += "<tr><td>" + results[count].search + "</td> <td>" + results[count].time + "</td></tr>"
				//  }

				indexPage += "</body></html>"
				response.send(indexPage);
			} else {
				response.send('<!DOCTYPE HTML><html><head><title>Top Searches</title></head><body><h1>Whoops, something went terribly wrong!</h1></body></html>');
			}
		});
	});

});

app.listen(process.env.PORT || 8888);