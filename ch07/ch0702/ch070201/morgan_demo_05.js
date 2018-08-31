// https://www.cnblogs.com/jokerjason/p/7815040.html

let express = require('express');
let fs = require('fs');
let morgan = require('morgan');
let path = require('path');
let rfs = require('rotating-file-stream');

let app = express();

let logDirectory = path.join(__dirname, 'log');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
let accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

app.get('/', function (req, res) {
    res.send('hello, world!')
});

app.listen('8080',function(){
    console.log("创建成功！")
});