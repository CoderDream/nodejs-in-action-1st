let events = require('events')
    , net = require('net');

let channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, client) {
    this.clients[id] = client;
    let self = this;
    this.subscriptions[id] = function(senderId, message) {
        if (id !== senderId) {
            self.clients[id].write(message);
        }
    };
    this.on('broadcast', this.subscriptions[id]);
});

channel.on('leave', function(id) {
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, id + " has left the chat.\n");
});

channel.on('shutdown', function() {
    channel.emit('broadcast', '', "Chat has shut down.\n");
    channel.removeAllListeners('broadcast');
});

let server = net.createServer(function (client) {
    let id = client.remoteAddress + ':' + client.remotePort;
    client.on('connect', function() {
        console.log('connect method called');
        channel.emit('join', id, client);
    });
    client.on('data', function(data) {
        let dataString = data.toString();
        if (dataString === "shutdown\r\n") {
            channel.emit('shutdown');
        }
        channel.emit('broadcast', id, dataString);
    });
    client.on('close', function() {
        channel.emit('leave', id);
    });
});
server.listen(8888);
