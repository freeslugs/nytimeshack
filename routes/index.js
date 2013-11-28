/*
 * GET home page.
 */

 exports.index = function(req, res){
 	res.render('partials/landing');
 	console.log(req.user);
 };


 exports.home = function(req, res){
 	res.render('index');
 	console.log(req.user);
 };

 exports.partials = function (req, res) {
 	var name = req.params.name;
 	res.render('partials/' + name);
 };