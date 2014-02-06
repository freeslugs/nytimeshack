
/**
 * Module dependencies
 */

 var express = require('express'),
 routes = require('./routes'),
 api = require('./routes/api'),
 http = require('http'),
 path = require('path'),
 passport = require('passport'),
 TwitterStrategy = require('passport-twitter').Strategy,
 Twit = require('twit')
 //html = require('html')
 //notemplate = require('express-notemplate')
 ;




 var app = module.exports = express();
	app.use(express.logger());



// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Twitter profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

/**
* Twitter authorization configuration
*/



passport.use(new TwitterStrategy({
	consumerKey: "nBjewuqqVB8VUVMFrMsbDw",
	consumerSecret: "evnMLknoWSOz4qSLOMZNkcnwlHckqZXh8VypeQ3wM",
	callbackURL: "http://tweetthepress.herokuapp.com/auth/twitter/callback" //http://tweetthepress.heroku.com/auth/twitter/callback
},
function(token, tokenSecret, profile, done) {
    // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
// console.log(profile.id);
// console.log(token);
// console.log(tokenSecret);

return done(null, {myToken: token, myTokenSecret: tokenSecret, id: profile.id});
}
));

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

/*app.set('statics', process.cwd() + '/public');
app.set('views', process.cwd() + '/views');
app.engine('html', notemplate.__express);
app.set('view engine', 'html');
app.use(express.static(app.get('statics')));
app.use(notemplate.middleware); // initialize document.location;
*/
//app.use(express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret:'nytimes'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
	app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/home', routes.home);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/members', api.get_member_info);
app.post('/posttweet', api.post_tweet);
app.get('/image', api.image_url);
app.get('/committee', api.get_committee_info);

// redirect all others to the index (HTML5 history)
// app.get('*', routes.index);

// Twitter Routes
app.get('/auth/twitter',
	passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
	passport.authenticate('twitter', { failureRedirect: '/login' }),
	function(req, res) {
		
    // Successful authentication, redirect home.
    console.log(req.user);
    res.redirect('/home');
});

/**
 * Start Server
 */

 http.createServer(app).listen(app.get('port'), function () {
 	console.log('Express server listening on port ' + app.get('port'));
 });
