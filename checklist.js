var mongodb = require('mongodb')
var redis = require('redis')
var async = require('async')
var chalk = require('chalk')
var isCallRedis = false

exports.MongoDB = (callback) => {
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/test';
  MongoClient.connect(url, callback)
}

exports.Redis = (callback) => {
  var client = redis.createClient()
  client.on('error', (error) => {
    if (!isCallRedis) callback(error)
    isCallRedis = true
  })
  client.on('connect', callback)
}

exports.check = (callback) => {
  var services = ['MongoDB', 'Redis']
  async.each(services, (service, done) => {
    exports[service]( (error) => {
      var serviceText = chalk.blue.bold(service)
      if (error) {
        console.log(chalk.red(`[✕] ${serviceText} has not been installed : ${error}`))
      } else {
        console.log(chalk.green(`[✓] ${serviceText} has been installed:`))
      }
      done()
    })
  }, callback)
}
