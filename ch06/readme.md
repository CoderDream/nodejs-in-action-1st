




## 6.1 搭建一个Connect 程序 ##

最小的Connect程序
```javascript
let connect = require('connect');
let app = connect();
app.listen(3000);
```

运行结果：
```shell
[root@localhost ~]# curl http://10.50.20.123:3000 -i
HTTP/1.1 404 Not Found
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
Content-Length: 139
Date: Wed, 15 Aug 2018 09:32:48 GMT
Connection: keep-alive

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /</pre>
</body>
</html>
[root@localhost ~]# 
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
[root@localhost ~]# curl http://10.50.20.123:3000/users -i
HTTP/1.1 200 OK
Content-Type: text/plain
Date: Wed, 15 Aug 2018 09:43:19 GMT
Connection: keep-alive
Content-Length: 11
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





```shell

[root@localhost ch050102]# node cli_tasks.js add Floss the cat
Saved.
[root@localhost ch050102]# node cli_tasks.js list
Floss the cat
[root@localhost ch050102]# node cli_tasks.js add Buy some hats
Saved.
[root@localhost ch050102]# node cli_tasks.js list
Floss the cat
Buy some hats
[root@localhost ch050102]# 
```

### 5.3.2 MongoDB ###


#### MongoDB安装(windows) ####

[原文出处](https://www.cnblogs.com/whybxy/p/8566523.html)

官方安装说明： http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/


- 下载MongoDB并安装

　　下载地址：http://www.mongodb.org/downloads



- 创建数据库和日志存放目录

　　在C盘根目录下新建“M_DB”和“M_LOG”两个文件夹，分别存放数据库文件和日志文件　　

- 创建一个config文件

　　打开目录“C:\Program Files\MongoDB 2.6 Standard\bin”，并在此目录下新建一个mongo.config文件，文件内容如下

```shell
##数据库目录
dbpath=C:\M_DB

##日志输出文件
logpath=C:\M_LOG\mongodb.log
```


- 添加环境变量

　　在环境变量PATH中加入“C:\Program Files\MongoDB 2.6 Standard\bin“

- 以Windows服务器运行MongoDB

　　以管理员方式打开CMD窗口，运行如下命令安装MongoDB服务，可以在 “控制面板\所有控制面板项\管理工具\服务”找到名为“MongoDB”的服务右键启动
```shell
mongod --config "C:\Program Files\MongoDB 2.6 Standard\bin\mongo.config" --install
```

- 启动服务

　　在CMD窗口中运行如下命令，也可以在可以在 “控制面板\所有控制面板项\管理工具\服务”
```shell
net start mongodb
```

- 测试连接

　　在CMD中运行如下命令，查看结果
```shell
mongo
```


- 详细过程

```shell
C:\Users\Admin>mongod --config "D:\MongoDB\Server\3.4\bin\mongo.config" --install

C:\Users\Admin>net start mongodb
MongoDB 服务正在启动 ..
MongoDB 服务已经启动成功。


C:\Users\Admin>mongo
MongoDB shell version v3.4.4
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.4
Server has startup warnings:
2018-08-15T11:16:21.179+0800 I CONTROL  [initandlisten]
2018-08-15T11:16:21.179+0800 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2018-08-15T11:16:21.179+0800 I CONTROL  [initandlisten] **          Read and write access to data and configuration is u
nrestricted.
2018-08-15T11:16:21.179+0800 I CONTROL  [initandlisten]
> 2 + 2
4
> dbs;
2018-08-15T11:18:20.700+0800 E QUERY    [thread1] ReferenceError: dbs is not defined :
@(shell):1:1
> show dbs;
admin  0.000GB
local  0.000GB
> use wilsondb1
switched to db wilsondb1
> db.createCollection('tb1');
{ "ok" : 1 }
> show collections;
tb1
> db.tb1.insert({"name":"wilson","age":27});
WriteResult({ "nInserted" : 1 })
> db.tb1.find();
{ "_id" : ObjectId("5b739becffa65d1402ad271c"), "name" : "wilson", "age" : 27 }
> exit
bye
```


```shell
Connected successfully to server
Inserted 3 documents into the collection
```


### 5.3.3 Mongoose ###

```javascript
let mongoose = require('mongoose');

const option = { useNewUrlParser: true };
mongoose.connect('mongodb://localhost:27017/tasks', option);

let Schema = mongoose.Schema;
let Tasks = new Schema({
    project: String,
    description: String
});
mongoose.model('Task', Tasks);

let Task = mongoose.model('Task');
let task = new Task();
task.project = 'Bikeshed';
task.description = 'Paint the bikeshed red.';
task.save(function (err) {
    if (err) throw err;
    console.log('Task saved.');
});

Task = mongoose.model('Task');
Task.find({'project': 'Bikeshed'}, function (err, tasks) {
    for (let i = 0; i < tasks.length; i++) {
        console.log('ID:' + tasks[i]._id);
        console.log(tasks[i].description);
    }
});

```


```shell
ID:5b73d59c2ceb641ca88bc850
Paint the bikeshed red.
rows_updated: [object Object]
Updated.
Task saved.
Record deleted.
```



```shell

```