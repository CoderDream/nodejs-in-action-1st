let flow = require('nimble');
let exec = require('child_process').exec;

// 下载指定版本的Node源码
function downloadNodeVersion(version, destination, callback) {
    let url = 'http://nodejs.org/dist/node-v' + version + '.tar.gz';
    let filepath = destination + '/' + version + '.tgz';
    exec('curl ' + url + ' >' + filepath, callback);
}

// 按顺序执行串行化任务
flow.series([
    function (callback) {
        // 并行下载
        flow.parallel([
            function (callback) {
                console.log('Downloading Node v0.4.6...');
                downloadNodeVersion('0.4.6', '/tmp', callback);
            },
            function (callback) {
                console.log('Downloading Node v0.4.7...');
                downloadNodeVersion('0.4.7', '/tmp', callback);
            }
        ], callback);
    },
    function (callback) {
        console.log('Creating archive of downloaded files...');
        exec(
            // 创建归档文件
            'tar cvf node_distros.tar /tmp/0.4.6.tgz /tmp/0.4.7.tgz',
            function (error, stdout, stderr) {
                if(error) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                }
                console.log('All done!');
                callback();
            }
        );
    }
]);