var queryString = require('querystring');
var request = require('request');


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
	var query = objParams.q;
	
	//variables to pull
	var name, last_name, twitter_id, facebook_id, party, state;
	
	//pull relevant info from Sunlight Foundation
	var sunlight = "http://congress.api.sunlightfoundation.com/legislators?apikey=356d66c74a74458295c7173ab534917d&query=" + query;	
	
	request(nyTimes, function(err, result) {
		var results = JSON.parse(result.body).results
		
		for(i = 0; i  < results.length; i++) {
			var t = results[i].title;
			bookTitles.push(t);
		}
		console.log(bookTitles);
		res.json(results);
	});
};	