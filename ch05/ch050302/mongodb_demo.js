let mongodb = require('mongodb');
let server = new mongodb.Server('127.0.0.1', 27017, {});
let client = new mongodb.Db('local', server, {w: 1});

client.open(function (err) {
    if (err) throw err;
    client.collection('test_insert', function (err, collection) {
        if (err) throw err;
        console.log('We are now able to perform queries.');
    });
});

//
// collection.insert(
//     {
//         "title": "I like cake",
//         "body": "It is quite good."
//     },
//     {safe: true},
//     function (err, documents) {
//         if (err) throw err;
//         console.log('Document ID is: ' + documents[0]._id);
//     }
// );
//
// let _id = new client.bson_serializer
//     .ObjectID('4e650d344ac74b5a01000001');
// collection.update(
//     {_id: _id},
//     {$set: {"title": "I ate too much cake"}},
//     {safe: true},
//     function (err) {
//         if (err) throw err;
//     }
// );
//
// collection.find({"title": "I like cake"}).toArray(
//     function(err, results) {
//         if (err) throw err;
//         console.log(results);
//     }
// );
//
// let _id = new client
//     .bson_serializer
//     .ObjectID('4e6513f0730d319501000001');
// collection.remove({_id: _id}, {safe: true}, function(err) {
//     if (err) throw err;
// });