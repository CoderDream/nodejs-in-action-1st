let http = require('http');
let fs = require('fs');

// 创建HTTP服务器并用回调定义响应逻辑
http.createServer(function(req, res) {
    if (req.url === '/') {
        // 读取JSON文件并用回调定义如何处理其中的内容
        fs.readFile('./titles.json', function(err, data) {
            // 如果出错，输出错误日志，并给客户端返回“Server Error”
            if (err) {
                console.error(err);
                res.end('Server Error');
            }
            else {
                // 从JSON文本中解析数据
                let titles = JSON.parse(data.toString());
                // 读取HTML模板，并在加载完成后使用回调
                fs.readFile('./template.html', function(err, data) {
                    if (err) {
                        console.error(err);
                        res.end('Server Error');
                    }
                    else {
                        let template = data.toString();
                        // 组装HTML页面以显示博客标题
                        let html = template.replace('%', titles.join('</li><li>'));
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        // 将HTML页面发送给用户
                        res.end(html);
                    }
                });
            }
        });
    }
}).listen(8000, "127.0.0.1");