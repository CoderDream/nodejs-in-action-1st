










## 4.2 构建RESTful Web 服务 ##

restful_server_01.js

```javascript
let http = require('http');
//let url = require('url');
// 用一个常规的JavaScript数组存放数据
let items = [];
let server = http.createServer(function(req, res){
    switch (req.method) {
        // req.method是请求所用的HTTP方法
        case 'POST':
            // 为进来的事项设置字符串缓存
            let item = '';
            // 将进来的data事件编码为UTF-8字符串
            req.setEncoding('utf8');
            req.on('data', function(chunk){
                // 将数据块拼接到缓存上
                item += chunk;
            });
            req.on('end', function(){
                // 将完整的新事项压入事项数组中
                items.push(item);
                res.end('OK\n');
            });
            break;
        case 'GET':
            items.forEach(function(item, i){
                res.write(i + ') ' + item + '\n');
            });
            res.end();
            break;
    }
});

server.listen(3000);
```




运行结果：
```shell
[root@localhost ch030202_socket]# curl -d 'buy groceries' http://10.50.20.123:3000
OK
[root@localhost ch030202_socket]# curl -d 'buy node in action' http://10.50.20.123:3000
OK
[root@localhost ch030202_socket]# curl http://10.50.20.123:3000
0) buy groceries
1) buy node in action
[root@localhost ch030202_socket]# 
```

```javascript
# node
> 'ect …'.length
5
> Buffer.byteLength('ect …')
7
> 
```

```javascript
> require('url').parse('http://localhost:3000/1?api-key=foobar')
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'localhost:3000',
  port: '3000',
  hostname: 'localhost',
  hash: null,
  search: '?api-key=foobar',
  query: 'api-key=foobar',
  pathname: '/1',
  path: '/1?api-key=foobar',
  href: 'http://localhost:3000/1?api-key=foobar' }
> 
```



```shell
# curl http://10.50.20.123:3000/file_server_05.js  -i
HTTP/1.1 404 Not Found
Date: Mon, 13 Aug 2018 08:41:36 GMT
Connection: keep-alive
Content-Length: 9

Not Found
```

### 4.4 从表单中接受用户输入 ###

```shell
name

file
File {
  _events: {},
  _eventsCount: 0,
  _maxListeners: undefined,
  size: 1318,
  path:
   'C:\\Users\\Admin\\AppData\\Local\\Temp\\upload_214e5fc0c0936334baf0bd31e4cf8acf',
  name: 'Node.js&#23454;&#25112;(&#31532;2&#23395;).txt',
  type: 'text/plain',
  hash: null,
  lastModifiedDate: 2018-08-13T08:54:08.078Z,
  _writeStream:
   WriteStream {
     _writableState:
      WritableState {
        objectMode: false,
        highWaterMark: 16384,
        finalCalled: true,
        needDrain: false,
        ending: true,
        ended: true,
        finished: true,
        destroyed: true,
        decodeStrings: true,
        defaultEncoding: 'utf8',
        length: 0,
        writing: false,
        corked: 0,
        sync: false,
        bufferProcessing: false,
        onwrite: [Function: bound onwrite],
        writecb: null,
        writelen: 0,
        bufferedRequest: null,
        lastBufferedRequest: null,
        pendingcb: 0,
        prefinished: true,
        errorEmitted: false,
        emitClose: false,
        bufferedRequestCount: 0,
        corkedRequestsFree: [Object] },
     writable: false,
     _events: {},
     _eventsCount: 0,
     _maxListeners: undefined,
     path:
      'C:\\Users\\Admin\\AppData\\Local\\Temp\\upload_214e5fc0c0936334baf0bd31e4cf8acf',
     fd: null,
     flags: 'w',
     mode: 438,
     start: undefined,
     autoClose: true,
     pos: undefined,
     bytesWritten: 1318,
     closed: false } }
```


### 4.5 用HTTPS 加强程序的安全性 ###
