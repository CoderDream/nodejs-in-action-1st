// https://www.npmjs.com/package/morgan

let express = require('express');
let morgan = require('morgan');
let app = express();
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// GET / 200 13 - 8.376 ms
app.get('/', function (req, res) {
    res.send('hello, world!');
});

app.listen(8080);
