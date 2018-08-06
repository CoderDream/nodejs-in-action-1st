let http = require('http');
let fs = require('fs');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'image/png'});
    fs.createReadStream('./image.png').pipe(res);
}).listen(3002);
console.log('Server running at http://localhost:3002/');