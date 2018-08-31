// https://www.cnblogs.com/jokerjason/p/7815040.html

let finalhandler = require('finalhandler');
let http = require('http');
let morgan = require('morgan');

// create "middleware"
let logger = morgan('combined');

http.createServer(function (req, res) {
    let done = finalhandler(req, res);
    logger(req, res, function (err) {
        if (err) return done(err);

        // respond to request
        res.setHeader('content-type', 'text/plain');
        res.end('hello, world!')
    })
}).listen('8080',function(){
    console.log("创建成功！")
});

// console: 
// 创建成功！
// ::1 - - [31/Aug/2018:07:19:32 +0000] "GET / HTTP/1.1" 200 13 "-" "curl/7.29.0"