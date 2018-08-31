// https://www.npmjs.com/package/morgan

let express = require('express');
let morgan = require('morgan');
let app = express();
app.use(morgan('tiny'));
// GET / 200 13 - 8.127 ms
app.get('/', function (req, res) {
    res.send('hello, world!');
});

app.listen(8080);
