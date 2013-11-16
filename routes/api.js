var queryString = require('querystring');
var request = require('request');
var Twit = require('twit');

exports.name = function (req, res) {
	res.json({
		name: 'Bob'
	});
};


exports.get_member_info = function(req, res) {
	//pull relevant info from Sunlight Foundation
	
	
	var allMembers = [];
	var page = 1;
	var count = 0;
	var perPage = 50;
	
	var reachedEnd = true;
	var sunlight = "http://congress.api.sunlightfoundation.com/legislators?apikey=356d66c74a74458295c7173ab534917d&per_page=50&page=" + page;
	
	request(sunlight, function(err, result) {

		var results = JSON.parse(result.body).results;
		console.log(results);
		console.log(results.length);

		for (var i = 0;  i <= results.length - 1; i++) {
			console.log("i: " + i);
			results[i].name = results[i].first_name + " " + results[i].last_name;
			
			allMembers.push(results[i].first_name);
			
			if( i == 49){
				page = page + 1;
				break;
			}
		};	

		console.log(allMembers);	
		console.log(allMembers.length);
		console.log(page);
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


exports.image_url = function(req, res) {

	var T = new Twit({
		consumer_key:         'rKxEEYe0OXdNC2Wh2qlXDA'
		, consumer_secret:      'JMfgdIUkUJj7Mfsdk1xAzD0M2dQ4dHkSjsXdWFtWVw'
		, access_token:         "253580597-C67jElQukNRNme53alW9DbGAfVx7CakKdvcdPMQW"
		, access_token_secret:  "QZowsMHXYay8YzuylHuFf0NHgeiTyN7adPtKMrETdKOfR"
	})

	var query = req._parsedUrl.query;
	var objParams = queryString.parse(query);

//grab params and set defaults
var message = objParams.message;

T.get('users/show', { screen_name: "repSteveIsrael"}, function(err, reply) {
	reply.profile_image_url;
	var url = reply.profile_image_url
	console.log(url);
})

}
