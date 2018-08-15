let MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
let url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db.close();
});
