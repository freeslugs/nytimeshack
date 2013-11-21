var queryString = require('querystring');
var request = require('request');
var Twit = require('twit');
//var scraper = require('scraper');
//var cheerio = require("cheerio");

 var getTwitterImage = function(twitterHandle) {
 };
// 	var T = new Twit({
// 		consumer_key:         'rKxEEYe0OXdNC2Wh2qlXDA'
// 		, consumer_secret:      'JMfgdIUkUJj7Mfsdk1xAzD0M2dQ4dHkSjsXdWFtWVw'
// 		, access_token:         "253580597-C67jElQukNRNme53alW9DbGAfVx7CakKdvcdPMQW"
// 		, access_token_secret:  "QZowsMHXYay8YzuylHuFf0NHgeiTyN7adPtKMrETdKOfR"
// 	})
// 	console.log("Twitter id: " + twitterHandle);

// 	T.get('users/show', { screen_name: twitterHandle}, function(err, reply) {
// 		if(err){
// 			console.log(err);
// 			return null;
// 		}
// 		if(reply.hasOwnProperty("profile_image_url")) {
// 			console.log(reply.profile_image_url);
// 			return reply.profile_image_url; 
// 		} else {
// 			return null;
// 		}
// 	});
// };

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
// var getTwitterImage = function(twitterHandle) {
/*	var url = 'http://twitter.com/' + twitterHandle;
	var img_url;
	request(url, function(err, resp, body){
		$ = cheerio.load(body);
		img_url = $('.profile-picture')[0].src;
		console.log(img_url);
		return img_url;
	});*/
// };


/** Using Google */

/*var getTwitterImage = function(memberName) {

}*/

// var getTwitterImage = function(memberName) {

// }


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
		consumer_key:         'MG7QrrtrOx6nig4610Kh1g'
		, consumer_secret:      'CDbMh9omMGBvHUnl8uwlkQOtZCwMRR3ZXt3NY9KSo'
		, access_token:         req.user.myToken
		, access_token_secret:  req.user.myTokenSecret
	})

	var query = req._parsedUrl.query;
	var objParams = queryString.parse(query);

//grab params and set defaults
var message = objParams.message;
var twitterhandles = objParams.twitterhandles;

for (var i = twitterhandles.length - 1; i >= 0; i--) {

	var finalmessage = "@" + twitterhandles[i] + " " + message;
	console.log(finalmessage);
	T.post('statuses/update', { status: finalmessage }, function(err, reply) {
		console.log(reply);
	})

};






};


exports.image_url = function(req, res) {

	var T = new Twit({
		consumer_key:         'MG7QrrtrOx6nig4610Kh1g'
		, consumer_secret:      'CDbMh9omMGBvHUnl8uwlkQOtZCwMRR3ZXt3NY9KSo'
		, access_token:         "313001567-k4LubhfDa0Mhyc2au9EI7mUwaPv53l6cdQIamvAU"
		, access_token_secret:  "ZzLJVc5kxX8xCgnHcIZ5e3w7KcyJd4o9FObLML4ck"
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
