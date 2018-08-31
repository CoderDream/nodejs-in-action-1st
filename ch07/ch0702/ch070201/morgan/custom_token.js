let express = require('express');
let app = express();
let morgan = require('morgan');

// 自定义token
morgan.token('from', function(req, res){
    //res.send('hello, world!');
    return req.query.from || '-';
});

// 自定义format，其中包含自定义的token
morgan.format('joke', '[joke] :method :url :status :from');

// 使用自定义的format
app.use(morgan('joke'));

app.use(function(req, res){
    res.send('ok');
});

app.listen(3000);