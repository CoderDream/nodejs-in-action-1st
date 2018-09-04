let express = require('express');
let app = express();
app.get('/', function(req, res){
    res.send('Hello');
});
app.listen(3000);