let mongoose = require('mongoose');

// 打开连接
const option = { useNewUrlParser: true };
mongoose.connect('mongodb://localhost:27017/tasks', option);

let Schema = mongoose.Schema;
let Tasks = new Schema({
    project: String,
    description: String
});
mongoose.model('Task', Tasks);

// 添加任务
let Task = mongoose.model('Task');
let task = new Task();
task.project = 'Bikeshed';
task.description = 'Paint the bikeshed red.';
task.save(function (err) {
    if (err) throw err;
    console.log('Task saved.');
});

// 搜索文档
// let Task = mongoose.model('Task');
Task.find({'project': 'Bikeshed'}, function (err, tasks) {
    for (let i = 0; i < tasks.length; i++) {
        console.log('ID:' + tasks[i]._id);
        console.log(tasks[i].description);
    }
});

// 更新文档
// let Task = mongoose.model('Task');
Task.update(
    // 用内部ID更新
    {_id: '5b73d59c2ceb641ca88bc850'},
    {description: 'Paint the bikeshed green.'},
    // 只更新一个文档
    {multi: false},
    function(err, rows_updated) {
        if (err) throw err;
        console.log('rows_updated: ' + rows_updated);
        console.log('Updated.');
    }
);

// 删除文档
// let Task = mongoose.model('Task');
Task.findById('5b73d59c2ceb641ca88bc850', function(err, task) {
    if(err) {
        console.log(err);
    }
    task.remove(function () {
        console.log('Record deleted.');
    });
});

// 关闭连接
// mongoose.disconnect();
