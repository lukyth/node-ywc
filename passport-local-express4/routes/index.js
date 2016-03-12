var express = require('express')
var passport = require('passport')
var Account = require('../models/account')
var app = express.Router()

app.get('/', function (req, res) {
  res.render('index', { user : req.user })
})

app.get('/register', function(req, res) {
    res.render('register', { })
})

app.get('/profile', function (req, res) {
  res.render('profile', {user:req.user})
})

app.get('/')

app.post('/register', function(req, res, next) {
  var registerData = {
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    age: req.body.age
  }
  Account.register(new Account(registerData), req.body.password, function(err, account) {
      if (err) {
        return res.status(400).send(`Something wrong: ${err}`)
      }

      passport.authenticate('local')(req, res, function () {
          req.session.save(function (err) {
              if (err) {
                  return next(err)
              }
              res.redirect('/')
          })
      })
  })
})

app.get('/login', function(req, res) {
    res.render('login', { user : req.user })
})

app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res, next) {
    req.session.save(function (err) {
        if (err) {
            return next(err)
        }
        res.redirect('/')
    })
})

app.get('/logout', function(req, res, next) {
    req.logout()
    req.session.save(function (err) {
        if (err) {
            return next(err)
        }
        res.redirect('/')
    })
})

app.get('/ping', function(req, res){
    res.status(200).send("pong!")
})

module.exports = app
