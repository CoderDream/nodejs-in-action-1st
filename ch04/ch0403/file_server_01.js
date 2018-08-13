let http = require('http');
let parse = require('url').parse;
let join = require('path').join;
let fs = require('fs');

// 该文件所在目录的路径
let root = __dirname;
let server = http.createServer(function(req, res){
    let url = parse(req.url);
    // 构造绝对路径
    let path = join(root, url.pathname);
    // 创建fs.ReadStream
    let stream = fs.createReadStream(path);

    // 将文件数据写到响应中
    stream.on('data', function(chunk){
        res.write(chunk);
    });
    stream.on('end', function(){
        // 文件写完后结束响应
        res.end();
    });
});
server.listen(3000);