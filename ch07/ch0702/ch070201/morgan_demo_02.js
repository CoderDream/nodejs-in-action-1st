// https://www.cnblogs.com/jokerjason/p/7815040.html

let express = require('express');
let morgan = require('morgan');

let app = express();

app.use(morgan('combined'));

app.get('/', function (req, res) {
    res.send('hello, world!')
});

app.listen('8080',function(){
    console.log("创建成功！")
});

// console:
// 创建成功！
// ::1 - - [31/Aug/2018:07:19:32 +0000] "GET / HTTP/1.1" 200 13 "-" "curl/7.29.0"