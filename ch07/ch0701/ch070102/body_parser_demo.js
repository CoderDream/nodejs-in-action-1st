let connect = require('connect');
let bodyParser = require('body-parser');

let app = connect()
    .use(bodyParser())
    .use(function(req, res){
// .. do stuff to register the user ..
        res.end('Registered new user: ' + req.body.username);
    });

app.listen(3000);