let http = require('http');
let fs = require('fs');

// 客户端请求一开始会进到这里
http.createServer(function (req, res) {
    // 控制权转交给了getTitles
    getTitles(res);
}).listen(8000, "127.0.0.1");

function getTitles(res) {
    // 获取标题，并将控制权转交给getTemplate
    fs.readFile('./titles.json', function (err, data) {
        if (err) {
            hadError(err, res);
        }
        else {
            getTemplate(JSON.parse(data.toString()), res);
        }
    })
}

function getTemplate(titles, res) {
    // getTemplate读取模板文件，并将控制权转交给formatHtml
    fs.readFile('./template.html', function (err, data) {
        if (err) {
            hadError(err, res);
        }
        else {
            formatHtml(titles, data.toString(), res);
        }
    })
}
function formatHtml(titles, tmpl, res) {
    // formatHtml得到标题和模板，渲染一个响应给客户端
    let html = tmpl.replace('%', titles.join('</li><li>'));
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
}
// 如果这个过程中出现了错误，hadError会将错误输出到控制台，并给客户端返回“Server Error”
function hadError(err, res) {
    console.error(err);
    res.end('Server Error');
}