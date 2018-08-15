//https://www.cnblogs.com/chengduxiaoc/p/7049498.html

let mongo = require("mongodb"); //引入mongodb模块
let assert = require("assert"); //引入断言模块

let MongoClient = mongo.MongoClient;  //开启服务

let Urls = "mongodb://localhost:27017/demo2";  //url储存  放在连接池中。

MongoClient.connect(Urls,function(err,db){  //获取连接
    assert.equal(null,err);  //使用断言模块代替以前的 if判断

    //插入数据
    db.collection("t1").insert({"name":"xiaoming"},function(err,result){ //连接到数据库上面，并使用参数传入集合
        assert.equal(null,err);
        console.log(result);
        db.close();
    });
});