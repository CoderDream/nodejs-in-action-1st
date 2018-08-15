const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Use connect method to connect to the server
const  connectOptions = {
    useNewUrlParser: true
};
MongoClient.connect(url, connectOptions,function(err, client) {
    assert.strictEqual(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    client.close();
});