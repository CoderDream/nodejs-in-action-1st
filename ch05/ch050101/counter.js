let http = require('http');
let counter = 0;
http.createServer(function(req, res) {
    counter++;
    res.write('I have been accessed ' + counter + ' times.');
    res.end();
}).listen(8888);