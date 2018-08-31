// https://www.cnblogs.com/jokerjason/p/7815040.html

let express = require('express');
let fs = require('fs');
let morgan = require('morgan');
let path = require('path');

let app = express();

// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

app.get('/', function (req, res) {
    res.send('hello, world!')
});

app.listen('8080',function(){
    console.log("创建成功！")
});