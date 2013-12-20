var queryString = require('querystring');
var request = require('request');
var Twit = require('twit');
var http = require('http');
//var httpSync = require('http-sync');
//var scraper = require('scraper');
//var cheerio = require("cheerio");
//var httpsync = require('httpsync');
var async = require('async');

var getTwitterImage = function(twitterHandle) {

	var data = '';
	var imageUrl;

	request("twitter.com/" + twitterHandle, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    data = body;
	  }
	});

	return data;
	/*var req = httpsync.get({ url : "twitter.com/" + twitterHandle});
	var res = req.end();
	return res;*/

	/*// Test GET request
	var req = http_sync.request({
	    host: 'nodejs.org',
	    path: '/'
	});

	// console.log(req);

	var res = req.end();

*/
	/*return httpSync.request({
	    protocol: 'https',
	    host: 'twitter.com',
	    path: '/' + twitterHandle
	}).end();*/

	/*http.get("http://www.twitter.com/" + twitterHandle, function(response) {
		response.on("data", function(body) {
			return body;
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
	return test;
	*/

	
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

exports.get_committee_info = function(req, res) {
	// get url string and convert to json object
	var query = req._parsedUrl.query;
	var objParams = queryString.parse(query);

	//grab params and set defaults
	var query = objParams.q;
	var committeeURL = "http://congress.api.sunlightfoundation.com/committees?apikey=356d66c74a74458295c7173ab534917d&query=" + query;

	request(committeeURL, function(err, result){
		var myResult = JSON.parse(result.body);
		res.json(myResult);
	})
}
 
exports.get_member_info = function(req, res) {
	// get url string and convert to json object
	var query = req._parsedUrl.query;
	var objParams = queryString.parse(query);

	//grab params and set defaults
	var party = objParams.party;
	var gender = objParams.gender;
	var state = objParams.state;
	var chamber = objParams.chamber;

	var url = "http://congress.api.sunlightfoundation.com/legislators?apikey=356d66c74a74458295c7173ab534917d&per_page=all&party=" + party +"&state=" + state +"&gender=" + gender +"&chamber=" + chamber; 
	var allMembers = [];
	
	request(url, function(err, result) {
		var results = JSON.parse(result.body).results;
		//iterate over each item, uses async module
		async.each(results, function(item, callback) {
			item.name = item.first_name + " " + item.last_name;
			if(item.twitter_id) {		
				//scrape online the image
				request("http://www.twitter.com/" + item.twitter_id, function (error, response, body) {
				  if (!error && response.statusCode == 200) {
				    
				  	/*
				  	SEARCH FOR THE IMG URL HERE!!!
				  	 */

					var start = body.indexOf('<img src="https://pbs.twimg.com') + 10;
					var string = body.substring(start, body.length);
					var end = string.indexOf('" alt="');

				    item.img_url = string.substring(0, end);
				    allMembers.push(item); 
					callback(); 
				  }
				});
			} else {
				//item.img_url = "notfound";
				allMembers.push(item); 
				callback(); 
			}	
		}, function(err){
		    if( err ) {
		      console.log('legit error');
		    } else {
		    	//successfully iterated through al items
		      res.json(allMembers);
		    }
		});
	});
}

exports.post_tweet = function(req, res) {
	var T = new Twit({
		consumer_key:         'cXxvghlBFhZ7OFdG8u5q6g'
		, consumer_secret:      'ld0ma78a82uYKxOhS6DL0wQZglBFJln1QcYALcsVlOM'
		, access_token:         req.user.myToken
		, access_token_secret:  req.user.myTokenSecret
	})

	var query = req._parsedUrl.query;
	var objParams = queryString.parse(query);

//grab params and set defaults
var message = objParams.message;
var twitterhandles = objParams.twitterhandles;

var parsedHandles = twitterhandles.split(",");

	for (var i = parsedHandles.length - 1; i >= 0; i--) {
		if(parsedHandles[i]) {

			var finalmessage = "@" + parsedHandles[i] + " " + message + " #TweetThePress";
			console.log(finalmessage);
			T.post('statuses/update', { status: finalmessage }, function(err, reply) {
				console.log(reply);
			});
		}

	};

};

exports.image_url = function(req, res) {

	var T = new Twit({
		consumer_key:         'cXxvghlBFhZ7OFdG8u5q6g'
		, consumer_secret:      'ld0ma78a82uYKxOhS6DL0wQZglBFJln1QcYALcsVlOM'
		, access_token:         "313001567-8nAPOqvdyvfR1GXrBpQPOt3pwlQpBKpx5QhgRBxc"
		, access_token_secret:  "f0cfpJ9xbzOJWsKS7VENtswpPOJ0xntztrTp7OSoNeJ1c"
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
