let https = require('https');
let fs = require('fs');

// 作为配置项的SSL密钥和证书
let options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./key-cert.pem')
};

// 第一个传入的就是配置项对象
https.createServer(options, function (req, res) {
    // https和http模块的API几乎一样
    res.writeHead(200);
    res.end("hello world\n");
}).listen(3000);