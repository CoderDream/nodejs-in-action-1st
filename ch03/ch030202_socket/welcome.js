let net = require('net');

let EventEmitter = require('events').EventEmitter;
let channel = new EventEmitter();
channel.on('join', function() {
    console.log("Welcome!");
});

channel.emit('join');

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