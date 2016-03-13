// dependencies
var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var flash = require('connect-flash')

var routes = require('./routes/index')
var users = require('./routes/users')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(require('cookie-parser')())
// app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))

var session = require('express-session')
var RedisStore = require('connect-redis')(session)
app.use(require('express-session')(
{
  saveUninitialized: false,
  resave: false,
    store: new RedisStore(
        {
            host: '127.0.0.1',       //where redis store is
            port: 6379,              //default redis port
            prefix: 'sess',          //prefix for sessions name is store
            pass: 'passwordtoredis'  //password to redis db
        }
    ),
    secret: 'cookiesecret',        //cookie secret
    key: 'express.sid'
}))

app.use(passport.initialize())
app.use(flash())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)

// passport config
var Account = require('./models/account')
passport.use(new LocalStrategy(Account.authenticate()))
passport.serializeUser(Account.serializeUser())
passport.deserializeUser(Account.deserializeUser())

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//                  |
// });              |
//                  |
//                  |____________________> saved to session req.session.passport.user = {id:'..'}
//                                    |
// passport.deserializeUser(function(id, done) {
//                   ________________|
//                   |
//     User.findById(id, function(err, user) {
//         done(err, user);
//                    |______________>user object attaches to the request as req.user
//
//  });
//   });
//
// mongoose

mongoose.connect('mongodb://localhost/myapp')


module.exports = app
