var mongodb = require('mongodb');


exports.insertData = function() {
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/test';
  MongoClient.connect(url, function (err, db) {
    console.log('Connection established to', url);
    var collection = db.collection('users');
    user = {first_name: 'John', last_name: 'Doe'};
    collection.insert(user, function(err, result){
      if(err) {
        console.error(err)
      }else {
        console.log('Successfully insert data to mongodb');
        collection.count(function(err, count) {
          if(err) {
            console.error(err)
          }
          console.log('You have %s mock data in database', count);
          db.close();
        })

      }

    });


  });
}
