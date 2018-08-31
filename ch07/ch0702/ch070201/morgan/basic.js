let express = require('express');
let app = express();
let morgan = require('morgan');

app.use(morgan('short'));
app.use(function(req, res){
    res.send('ok');
});

app.listen(3000);