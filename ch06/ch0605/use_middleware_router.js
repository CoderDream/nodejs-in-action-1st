let connect = require('connect');
let router = require('./middleware/router');
let routes = {
    GET: {
        '/users': function(req, res){
            res.end('tobi, loki, ferret');
        },
        '/user/:id': function(req, res, id){
            res.end('user ' + id);
        }
    },
    DELETE: {
        '/user/:id': function(req, res, id){
            res.end('deleted user ' + id);
        }
    }
};
connect()
    // 将路由对象传给路由器的setup函数
    .use(router(routes))
    .listen(3000);