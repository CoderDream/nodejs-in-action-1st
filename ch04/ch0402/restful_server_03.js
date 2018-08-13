let http = require('http');
//let url = require('url');
// 用一个常规的JavaScript数组存放数据
let items = [];
let server = http.createServer(function(req, res){
    switch (req.method) {
        // req.method是请求所用的HTTP方法
        case 'POST':
            // 为进来的事项设置字符串缓存
            let item = '';
            // 将进来的data事件编码为UTF-8字符串
            req.setEncoding('utf8');
            req.on('data', function(chunk){
                // 将数据块拼接到缓存上
                item += chunk;
            });
            req.on('end', function(){
                // 将完整的新事项压入事项数组中
                items.push(item);
                res.end('OK\n');
            });
            break;
        case 'GET':
            let body = items.map(function(item, i){
                return i + ') ' + item;
            }).join('\n');
            res.setHeader('Content-Length', Buffer.byteLength(body));
            res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
            res.end(body);
            break;
        case 'DELETE':
            let path = url.parse(req.url).pathname;
            let i = parseInt(path.slice(1), 10);
            // 检查数字是否有效
            if (isNaN(i)) {
                res.statusCode = 400;
                res.end('Invalid item id');
            }
            // 确保请求的索引存在
            else if (!items[i]) {
                res.statusCode = 404;
                res.end('Item not found');
            } else {
                // 删除请求的事项
                items.splice(i, 1);
                res.end('OK\n');
            }
            break;
    }
});

server.listen(3000);