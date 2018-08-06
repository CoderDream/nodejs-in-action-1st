let http = require('http');
let server = http.createServer();
server.on('request', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
});

server.listen(3001);
console.log('Server running at http://localhost:3001/');