




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



```javascript
[root@localhost /]# curl http://localhost:3000
hello world

[root@localhost /]# curl http://localhost:3000/foo
hello world

```


```shell
[root@localhost /]# curl http://localhost:3000/admin/users
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Error: Unauthorized<br>
```



```shell
[root@localhost /]# curl --user tobi:ferret http://localhost:3000/admin/users
["tobi","loki","jane"][root@localhost /]#
```