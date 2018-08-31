// https://www.cnblogs.com/jokerjason/p/7815040.html

let express = require('express');
let morgan = require('morgan');
let uuid = require('uuid');

morgan.token('id', function getId (req) {
    return req.id
});

let app = express();

// use custom token formats
app.use(assignId);
app.use(morgan(':id :method :url :response-time'));

app.get('/', function (req, res) {
    res.send('hello, world!')
});

app.listen('8080',function(){
    console.log("创建成功！")
});

function assignId (req, res, next) {
    req.id = uuid.v4();
    next();
}