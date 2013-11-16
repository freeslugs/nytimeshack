var queryString = require('querystring');
var request = require('request');

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
	var sunlight = "http://congress.api.sunlightfoundation.com/legislators?apikey=356d66c74a74458295c7173ab534917d";	

	request(sunlight, function(err, result) {
		var results = JSON.parse(result.body).results;

		for (var i = results.length - 1; i >= 0; i--) {
			results[i].name = results[i].first_name + " " + results[i].last_name;
		};
		res.json(results);
	});
};


