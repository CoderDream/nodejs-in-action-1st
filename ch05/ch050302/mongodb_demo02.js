let mongo = require("mongodb"); //引入mongodb模块
let assert = require("assert"); //引入断言模块

let MongoClient = mongo.MongoClient;  //开启服务

let Urls = "mongodb://localhost:27017/demo2";  //url储存  放在连接池中。

MongoClient.connect(Urls,function(err,db){  //获取连接
    assert.equal(null,err);  //使用断言模块代替以前的 if判断


    //查找数据
    db.collection("t1").find({"name":"xiaoming"}).toArray(function(err,result){
        assert.equal(null,err);
        console.log(result);
        db.close();
    })


});