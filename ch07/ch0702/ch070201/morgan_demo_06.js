// https://www.cnblogs.com/jokerjason/p/7815040.html

let express = require('express');
let fs = require('fs');
let morgan = require('morgan');
let path = require('path');

let app = express();

// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 400 }
}));

// log all requests to access.log
app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
}));

app.get('/', function (req, res) {
    res.send('hello, world!')
});

app.listen('8080',function(){
    console.log("创建成功！")
});