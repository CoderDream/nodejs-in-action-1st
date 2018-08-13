let net = require('net');
let server = net.createServer(function(socket) {
    // data事件只被处理一次
    socket.once ('data', function(data) {
        socket.write(data);
    });
});
server.listen(8888);