var queryString = require('querystring');
var request = require('request');
var Twit = require('twit');

exports.name = function (req, res) {
	res.json({
		name: 'Bob'
	});
};

exports.get_member_info = function(req, res) {
	var allMembers = [];
	var count = 0;
	var totalLength = 537;
	var url = "http://congress.api.sunlightfoundation.com/legislators?apikey=356d66c74a74458295c7173ab534917d&per_page=all";
	request(url, function(err, result) {
		var results = JSON.parse(result.body).results;
		for (var i = results.length - 1; i >= 0; i--) {
			console.log(results[i].first_name);
		};
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


