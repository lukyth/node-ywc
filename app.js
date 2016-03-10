var os = require('os');
var chalk = require('chalk')
var db = require('./db')
var checklist = require('./checklist')

console.log('You are %s on `%s` platform',os.hostname(), process.platform);
console.log('Using node version %s', process.versions.node);
console.log('========= Checking required program ========');
checklist.check(() => {
  console.log('====== Testing insert data to mongodb =====');
  db.insertData()

})
