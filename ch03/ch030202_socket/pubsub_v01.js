let events = require('events');
let net = require('net');

let channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

// 添加join事件的监听器，保护用户的client对象，以便程序可以将数据发送给用户
channel.on('join', function(id, client) {
    this.clients[id] = client;
    let self = this;
    this.subscriptions[id] = function(senderId, message) {
        // 忽略发出这一广播数据的用户
        if (id !== senderId) {
            self.clients[id].write(message);
        }
    };
    // 添加一个专门针对当前用户的broadcast事件监听器
    this.on('broadcast', this.subscriptions[id]);
});


let server = net.createServer(function (client) {
    let id = client.remoteAddress + ':' + client.remotePort;

    client.on('connect', function() {
        channel.emit('join', id, client);
    });
    client.on('data', function(data) {
        channel.emit('broadcast', id, data.toString());
    });
});
server.listen(8888);
