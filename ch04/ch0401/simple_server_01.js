let http = require('http');
let server = http.createServer(function(req, res){
    res.end('Hello World');
});
server.listen(3000);