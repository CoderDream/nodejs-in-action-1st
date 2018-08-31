// https://www.npmjs.com/package/morgan

let express = require('express');
let morgan = require('morgan');
let app = express();
app.use(morgan('combined'));
// ::1 - - [31/Aug/2018:07:13:46 +0000] "GET / HTTP/1.1" 200 13 "-" "curl/7.29.0"
app.get('/', function (req, res) {
    res.send('hello, world!');
});

app.listen(8080);
