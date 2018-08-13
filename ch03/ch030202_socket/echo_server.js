let net = require('net');

let server = net.createServer(function(socket) {
    // 当读取到新数据时处理的data事件
    socket.on('data', function(data) {
        // 数据被写回到客户端
        socket.write(data);
        // 服务器端打印新数据到控制台
        console.log('data: ' + data);
    });
});
server.listen(8888);