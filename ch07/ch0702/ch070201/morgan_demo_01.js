// https://www.cnblogs.com/jokerjason/p/7815040.html

let express = require('express');
let fs = require('fs');
let logger = require('morgan');

let app = express();

let accessLog = fs.createWriteStream('../access.log', {flags : 'a'});
//let errorLog = fs.createWriteStream('../error.log', {flags : 'a'});

app.use(logger('dev'));     //打印到控制台  
app.use(logger('combined', {stream : accessLog}));      //打印到log日志
