var queryString = require('querystring');
var request = require('request');
var Twit = require('twit');
//var scraper = require('scraper');
//var cheerio = require("cheerio");

var getTwitterImage = function(twitterHandle) {
	var T = new Twit({
		consumer_key:         'rKxEEYe0OXdNC2Wh2qlXDA'
		, consumer_secret:      'JMfgdIUkUJj7Mfsdk1xAzD0M2dQ4dHkSjsXdWFtWVw'
		, access_token:         "253580597-C67jElQukNRNme53alW9DbGAfVx7CakKdvcdPMQW"
		, access_token_secret:  "QZowsMHXYay8YzuylHuFf0NHgeiTyN7adPtKMrETdKOfR"
	})
	console.log("Twitter id: " + twitterHandle);
	setTimeout(function, milliseconds);
	T.get('users/show', { screen_name: twitterHandle}, function(err, reply) {
		console.log(reply.profile_image_url);
		return reply.profile_image_url; 


	});
};

/** Scrapping */
/*var getTwitterImage = function(twitterHandle) {
	scraper('http://twitter.com/' + twitterHandle, function(err, jQuery) {
	console.log(result);
    console.log(jQuery('.profile-picture').attr("src"));
	return jQuery('.profile-picture').attr("src");
    // 	.each(function() {
    //     console.log(jQuery(this).text().trim()+'\n');
    // });
});
}*/
var getTwitterImage = function(twitterHandle) {
/*	var url = 'http://twitter.com/' + twitterHandle;
	var img_url;
	request(url, function(err, resp, body){
		$ = cheerio.load(body);
		img_url = $('.profile-picture')[0].src;
		console.log(img_url);
		return img_url;
	});*/
};


/** Using Google */

<<<<<<< HEAD
/*var getTwitterImage = function(memberName) {

}*/
=======
// var getTwitterImage = function(memberName) {

// }
>>>>>>> 93e79f3e53a1fc6368e2f2f35a69ddb58f974624

exports.get_member_info = function(req, res) {
	var url = "http://congress.api.sunlightfoundation.com/legislators?apikey=356d66c74a74458295c7173ab534917d&per_page=all";
	var allMembers = [];
	request(url, function(err, result) {
		var results = JSON.parse(result.body).results;
		for (var i = results.length - 1; i >= 0; i--) {
			results[i].name = results[i].first_name + " " + results[i].last_name;
			if(results[i].twitter_id) {							
				getTwitterImage(results[i].twitter_id);
			} else {
				results[i].img_url = "notfound";
			}
			allMembers.push(results[i]);
		};
		res.json(allMembers);
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
var twitterhandle = objParams.twitterhandle;

var finalmessage = "@" + twitterhandle + " " + message;

T.post('statuses/update', { status: finalmessage }, function(err, reply) {
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
