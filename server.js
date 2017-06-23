//importing dependencies
var express = require('express'),
  mongoose = require('mongoose'),
  db = require('./models'),
  controllers = require('./controllers'),
  bodyParser = require('body-parser'),
  vegetable = require('./models/vegetable'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

var app = express(),
  router = express.Router();

var User = db.User;

//to config API to use body body-parser and look for JSON in req.body
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
  secret: 'spinachsecret007', // change this!
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//passport config
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

//Prevent CORS errors
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //Remove caching
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//veg routes
app.get('/api', controllers.api.index);
app.get('/api/vegetables', controllers.vegetable.index);
app.get('/api/vegetables/:vegetable_id', controllers.vegetable.show);
app.post('/api/vegetables', controllers.vegetable.create);
app.delete('/api/vegetables/:vegetable_id', controllers.vegetable.destroy);
app.get('/api/veggienuke',controllers.vegetable.nuke);

//auth routes
app.get('/api/users', controllers.user.index);
app.delete('/api/users/:user_id',controllers.user.destroy);
app.post('/signup', function signup(req, res) {
  console.log(`${req.body.username} ${req.body.password}`);
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.send(newUser);
      });
    }
  )});
app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log(JSON.stringify(req.user));
  res.send(req.user);
});
app.get('/logout', function (req, res) {
  console.log("BEFORE logout", req);
  req.logout();
  res.send(req);
  console.log("AFTER logout", req);
});
var port = process.env.API_PORT || 3001;
app.listen(port, function() {
    console.log(`api running on ${port}`);
});
