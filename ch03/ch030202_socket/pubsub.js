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

// 创建leave事件的监听器
channel.on('leave', function(id) {
    // 移除指定客户端的broadcast监听器
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, id + " has left the chat.\n");
});

// 创建停止服务的监听器
channel.on('shutdown', function() {
    channel.emit('broadcast', '', "Chat has shut down.\n");
    channel.removeAllListeners('broadcast');
});

let server = net.createServer(function (client) {
    let id = client.remoteAddress + ':' + client.remotePort;
    // 当有用户连到服务器上来时发出一个join事件，指明用户ID和client对象
    // client.on('connect', function() {
    //     channel.emit('join', id, client);
    //     console.log('join: ' + id);
    // });
    client.on('connect', function(id, client) {
        let welcome = "Welcome!\n" + 'Guest online: ' + this.listeners('broadcast').length;
        client.write(welcome + "\n");

        channel.emit('join', id, client);
        channel.emit('connect', id, client);
        console.log('join: ' + id);
    });

    // 当有用户发送数据时，发出一个频道broadcast事件，指明用户ID和消息
    client.on('data', function(data) {
        let dataString = data.toString();
        if (dataString === "shutdown\r\n") {
            channel.emit('shutdown');
        }
        console.log(dataString);
        channel.emit('broadcast', id, dataString);
    });

    client.on('close', function() {
        // 在用户断开连接时发出leave事件
        console.log('close method called');
        channel.emit('leave', id);
    });
});
server.listen(8888);
