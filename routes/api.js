var queryString = require('querystring');
var request = require('request');
var Twit = require('twit');

// var User = mongoose.Schema({
// 	author: String,
// 	titles: [String]
// });

exports.name = function (req, res) {
	res.json({
		name: 'Bob'
	});
};

exports.get_member_info = function(req, res) {
	//get url string and covert it to json object
	var query = req._parsedUrl.query;
	var objParams = queryString.parse(query);
	
	//grab params and set defaults
	var member = objParams.member;
	//pull relevant info from Sunlight Foundation
	var sunlight = "http://congress.api.sunlightfoundation.com/legislators?apikey=356d66c74a74458295c7173ab534917d&per_page=50&page=1";	

	request(sunlight, function(err, result) {
		var results = JSON.parse(result.body).results;

		for (var i = results.length - 1; i >= 0; i--) {
			results[i].name = results[i].first_name + " " + results[i].last_name;
		};
		res.json(results);
	});
};

exports.post_tweet = function(req, res) {
	var T = new Twit({
		consumer_key:         'rKxEEYe0OXdNC2Wh2qlXDA'
		, consumer_secret:      'JMfgdIUkUJj7Mfsdk1xAzD0M2dQ4dHkSjsXdWFtWVw'
		, access_token:         req.user.myToken
		, access_token_secret:  req.user.myTokenSecret
	})
	
	var query = req._parsedUrl.query;
	var objParams = queryString.parse(query);
	
	//grab params and set defaults
	var message = objParams.message;
 
	T.post('statuses/update', { status: message}, function(err, reply) {

	})

	
};


