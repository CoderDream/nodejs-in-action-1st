let http = require('http');
let parse = require('url').parse;
let join = require('path').join;
let fs = require('fs');

// 该文件所在目录的路径
let root = __dirname;
let server = http.createServer(function(req, res){
    // 解析URL以获取路径名
    let url = parse(req.url);
    // 构造绝对路径
    let path = join(root, url.pathname);
    // 检查文件是否存在
    fs.stat(path, function(err, stat){
        if (err) {
            // 文件不存在
            if ('ENOENT' === err.code) {
                res.statusCode = 404;
                res.end('Not Found');
            }
            // 其他错误
            else {
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        } else {
            // 用stat对象的属性设置Content-Length
            res.setHeader('Content-Length', stat.size);
            let stream = fs.createReadStream(path);
            stream.pipe(res);
            stream.on('error', function(err){
                res.statusCode = 500;
                console.log(err);
                res.end('Internal Server Error');
            });
        }
    });
});
server.listen(3000);