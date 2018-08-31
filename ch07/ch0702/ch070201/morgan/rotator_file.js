let FileStreamRotator = require('file-stream-rotator');
let express = require('express');
let fs = require('fs');
let morgan = require('morgan');
let path = require('path');

let app = express();
let logDirectory = path.join(__dirname, 'log');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
let accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
});

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

app.get('/', function (req, res) {
    res.send('hello, world!')
});

app.listen(3000);