// 内置的http模块提供了HTTP服务器和客户端功能
let http = require('http');
let fs  = require('fs');
// 内置的path模块提供了与文件系统路径相关的功能
let path = require('path');
// 附加的mime模块有根据文件扩展名得出MIME类型的能力
let mime = require('mime');
// cache是用来缓存文件内容的对象
let cache = {};

// 请求的文件不存在时发送404错误
function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: resource not found.');
    response.end();
}

// 提供文件数据服务
function sendFile(response, filePath, fileContents) {
    response.writeHead(
        200,
        {"content-type": mime.lookup(path.basename(filePath))}
    );
    response.end(fileContents);
}

// 提供静态文件服务
function serveStatic(response, cache, absPath) {
    // 检查文件是否缓存在内存中
    if (cache[absPath]) {
        // 从内存中返回文件
        sendFile(response, absPath, cache[absPath]);
    } else {
        // 检查文件是否存在
        fs.exists(absPath, function(exists) {
            if (exists) {
                // 从硬盘中读取文件
                fs.readFile(absPath, function(err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        // 从硬盘中读取文件并返回
                        sendFile(response, absPath, data);
                    }
                });
            } else {
                // 发送 HTTP 404响应
                send404(response);
            }
        });
    }
}

// 创建HTTP服务器的逻辑
// 创建HTTP服务器，用匿名函数定义对每个请求的处理行为
let server = http.createServer(function(request, response) {
    let filePath = false;
    if (request.url == '/') {
        // 确定返回的默认html文件
        filePath = 'public/index.html';
    } else {
        // 将 url 路径转为文件的相对路径
        filePath = 'public' + request.url;
    }

    let absPath = './' + filePath;
    // 返回静态文件
    serveStatic(response, cache, absPath);
});

server.listen(3000, function() {
    console.log("Server listening on port 3000.");
});

let chatServer = require('./lib/chat_server');
chatServer.listen(server);