let http = require('http');
let fs = require('fs');
http.createServer(function(req, res) {
    if (req.url === '/') {
        fs.readFile('./titles.json', function(err, data) {
            if (err) {
                console.error(err);
                res.end('Server Error');
            }
            else {
                let titles = JSON.parse(data.toString());
                fs.readFile('./template.html', function(err, data) {
                    if (err) {
                        console.error(err);
                        res.end('Server Error');
                    }
                    else {
                        let template = data.toString();
                        let html = template.replace('%', titles.join('</li><li>'));
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(html);
                    }
                });
            }
        });
    }
}).listen(8000, "127.0.0.1");