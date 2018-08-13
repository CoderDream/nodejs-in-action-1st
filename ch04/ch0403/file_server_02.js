let http = require('http');
let parse = require('url').parse;
let join = require('path').join;
let fs = require('fs');

// 该文件所在目录的路径
let root = __dirname;
let server = http.createServer(function(req, res){
    let url = parse(req.url);
    let path = join(root, url.pathname);
    let stream = fs.createReadStream(path);
    // res.end()会在stream.pipe()内部调用
    stream.pipe(res);
});
server.listen(3000);