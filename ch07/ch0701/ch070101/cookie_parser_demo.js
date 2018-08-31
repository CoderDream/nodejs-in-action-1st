// node会话管理——cookie-parser
// https://www.cnblogs.com/bq-med/p/8995100.html

let express = require('express');

//引入cookie-parser模块
let cookieParser = require("cookie-parser");

//创建express实例
let app = express();

// 设定监听端口
app.set('port', process.env.PORT || 3000);

//创建cookie实例
app.use(cookieParser());

app.use("/login", function(req,res){
    //获取cookie
    console.log(req.cookies);

    //设置cookie,关闭签名
    res.cookie("user", {username: req.body.username}, {maxAge: 600000 , httpOnly: true, 'signed': false});
});

//监听3000端口
//let server =
app.listen(app.get('port'),function(){
    console.log("创建成功！")
});