let express = require('express');
let app = express();
let morgan = require('morgan');
let fs = require('fs');
let path = require('path');

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use(morgan('short', {stream: accessLogStream}));
app.use(function(req, res){
    res.send('ok');
});

app.listen(3000);