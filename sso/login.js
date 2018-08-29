/**
 * Created by Mloong on 2018/7/30
 * 实现单点登录
 */
let express = require('express');
let app = express();
let bodyparser = require('body-parser');
let crypto = require('crypto');
let session = require('express-session');
let cookie = require('cookie-parser');
let path = require('path');
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
app.use(bodyparser.json());
let mdb;

/**
 * session,cookie中间件。
 */
app.use(cookie());
app.use(session({
    secret: 'secret', // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 3 // 设置 session 的有效时间，单位毫秒
    }
}));
//app.set('tem', __dirname); //设置模板的目录
//app.set('view engine', 'html'); // 设置解析模板文件类型：这里为html文件
//app.engine('html', require('ejs').__express); // 使用ejs引擎解析html文件中ejs语法
//app.use(bodyparser.json()); // 使用bodyparder中间件，
//app.use(bodyparser.urlencoded({ extended: true }));


/**
 * 连接mongodb
 */
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/runoob";


/**
 * 生成令牌
 * 生成token
 * @return {string} return 返回值
 * */
function genToken() {
    let buf = crypto.randomBytes(12);
    let token = buf.toString('hex');
    return token;
}


/**
 * 请求数据库
 */
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("runoob");
    mdb = dbo;
});

/**
 * 注册
 */
app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname, './public/templates', 'register.html'));
});

app.post('/register', multipartMiddleware, function (req, res) {
        let username = req.body.user;
        let password = req.body.pwd;
        console.log(username);
        mdb.collection('user').findOne({username: username}, function (err, result) {
            if (err) throw err;
            if (result) {
                res.json({
                    ret_code: 1,
                    ret_msg: '用户名已存在请更换用户名！'
                });
            }
            else {
                mdb.collection('user').insertOne({usernaem: username, password: password}, function (err, result) {
                    if (err) throw err;
                    res.redirect('/login');
                });

            }
        });
    }
);

/**
 * 登录
 */
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, './public/templates', 'login.html'));
});
app.post('/login', function (req, res) {
    let username = req.body.user;
    let password = req.body.pwd;
    mdb.collection("user").findOne({username: username, password: password}, function (err, result) {
        if (err) throw err;
        if (result) {
            let ticket = genToken();
            mdb.collection('token').insertOne({ticket: ticket}, function (err, Lresult) {
            });
            req.session.ticket = ticket;
            res.cookie.ticket = ticket;
            res.redirect('/index');
        } else {
            res.json({
                ret_code: 1,
                ret_msg: '用户名或密码错误！'
            });
        }
    });
});

/**
 * 认证中心
 */
app.get('/authentication', function (req, res) {
    if (req.session.ticket) {
        console.log("进入认证");
        let url = req.query.callback;
        let token = req.session.ticket;
        url = console.log(url + "?token=" + token);
        res.redirect(url);
    }
    else {
        res.redirect('/login');
    }
});

/**
 * 首页
 */
app.get('/index', function (req, res) {
    if (req.session.ticket) {
        res.sendFile(path.join(__dirname, './public/templates', 'index.html'));
    }
    else {
        res.redirect('/login');
    }
});

/**
 * 注销
 */
app.post('/cancellation', function (req, res) {
    let token = req.session.ticket;
    delete req.session.ticket;
    mdb.collection('user').removeOne({ticket: token}, function (ree, result) {
        if (err) throw err;
        res.redirect('/login');

    });

});
let server = app.listen(8881, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("访问地址为 http://%s:%s", host, port);
});