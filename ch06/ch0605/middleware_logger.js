
// setup 函数可以用不同的配置调用多次
function setup(format) {
    // logger组件用正则表达式匹配请求属性
    let regexp = /:(\w+)/g;
    // Connect 使用的真实logger组件
    return function logger(req, res, next) {
        // 用正则表达式格式化请求的日志条目
        let str = format.replace(regexp, function(match, property){
            return req[property];
        });
        // 将日志条目输出到控制台
        console.log(str);
        // 将控制权交给下一个中间件组件
        next();
    }
}
// 直接导出logger的setup函数
module.exports = setup;