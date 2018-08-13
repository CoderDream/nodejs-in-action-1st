let http = require('http');

let server = http.createServer(function(req, res){

    req.setEncoding('utf8');

    // 只要读入了新的数据块，就触发data事件
    req.on('data', function(chunk){
        // 现在的数据块不再是Buffer对象，而是一个utf8字符串
        console.log('parsed', chunk);
    });

    // 数据全部读完之后触发end事件
    req.on('end', function(){
        console.log('done parsing');
        res.end()
    });
});
server.listen(3000);