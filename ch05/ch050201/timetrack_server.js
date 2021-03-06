let http = require('http');
let work = require('./lib/timetrack');
let mysql = require('mysql');

// 连接MySQL
let db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'timetrack'
});

let server = http.createServer(function (req, res) {
    switch (req.method) {
        case 'POST':
            switch (req.url) {
                case '/':
                    work.add(db, req, res);
                    break;
                case '/archive':
                    work.archive(db, req, res);
                    break;
                case '/delete':
                    work.delete(db, req, res);
                    break;
            }
            break;
        case 'GET':
            switch (req.url) {
                case '/':
                    work.show(db, res);
                    break;
                case '/archive':
                    work.showArchived(db, res);
            }
            break;
    }
});

// 建表SQL
db.query(
    "CREATE TABLE IF NOT EXISTS work ("
    + "id INT(10) NOT NULL AUTO_INCREMENT, "
    + "hours DECIMAL(5,2) DEFAULT 0, "
    + "date DATE, "
    + "archived INT(1) DEFAULT 0, "
    + "description LONGTEXT,"
    + "PRIMARY KEY(id))",
    function (err) {
        if (err) throw err;
        console.log('Server started...');
        // 启动HTTP服务器
        server.listen(3003, '127.0.0.1');
    }
);
