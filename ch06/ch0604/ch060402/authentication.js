let connect = require('connect');

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}

function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
}

function authenticateWithDatabase(user, pass, callback) {
    let err;
    if (user !== 'tobi' || pass !== 'ferret') {
        err = new Error('Unauthorized');
    }
    callback(err);
}

function restrict(req, res, next) {
    let authorization = req.headers.authorization;
    if (!authorization) return next(new Error('Unauthorized'));

    let parts = authorization.split(' ');
    //let scheme = parts[0];
    let auth = new Buffer(parts[1], 'base64').toString().split(':');
    let user = auth[0];
    let pass = auth[1];

    authenticateWithDatabase(user, pass, function (err) {
        if (err) return next(err);
        next();
    });
}

function admin(req, res) {
    switch (req.url) {
        case '/':
            res.end('try /users');
            break;
        case '/users':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(['tobi', 'loki', 'jane']));
            break;
    }
}

connect()
    .use(logger)
    .use('/admin', restrict)
    .use('/admin', admin)
    .use(hello)
    .listen(3000);
