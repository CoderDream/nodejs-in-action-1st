let http = require('http');
let fs = require('fs');

http.createServer(function (req, res){
    getTitles(res);
}).listen(8000, "127.0.0.1");

function getTitles(res) {
    fs.readFile('./titles.json', function (err, data) {
        if (err) return hadError(err, res);

        // 在这里不再创建一个else分支，而是直接return，因为如果出错的话，也没有必要继续执行这个函数了
        getTemplate(JSON.parse(data.toString()), res)
    })
}

function getTemplate(titles, res) {
    fs.readFile('./template.html', function (err, data) {
        if (err) return hadError(err, res);
        formatHtml(titles, data.toString(), res)
    })
}

function formatHtml(titles, tmpl, res) {
    let html = tmpl.replace('%', titles.join('</li><li>'));
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
}

function hadError(err, res) {
    console.error(err);
    res.end('Server Error')
}