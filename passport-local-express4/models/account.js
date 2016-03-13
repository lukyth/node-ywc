var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: {
      type: String,
      required: true
    },
    password: String,
    email: String,
    fullname: String,
    age: {
      type: Number,
      min: 10,
      max: 100
    }
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('accounts', Account);
