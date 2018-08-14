let fs = require('fs');
let path = require('path');
// 去掉“node cli_tasks.js”，只留下参数
let args = process.argv.splice(2);
// 取出第一个参数（命令）
let command = args.shift();
// 合并剩余的参数
let taskDescription = args.join(' ');
// 根据当前的工作目录解析数据库的相对路径
let file = path.join(process.cwd(), '/.tasks');

switch (command) {

    case 'list':
        // 列出所有已保存的人
        listTasks(file);
        break;

    case 'add':
        // 添加新任务
        addTask(file, taskDescription);
        break;

    default:
        // 其他任何参数都会显示帮助
        console.log('Usage: ' + process.argv[0]
            + ' list|add [taskDescription]');
}

function loadOrInitializeTaskArray(file, cb) {
    // 检查.tasks文件是否已经存在
    fs.exists(file, function(exists) {

        if (exists) {
            // 从.tasks文件中读取待办事项数据
            fs.readFile(file, 'utf8', function(err, data) {
                if (err) throw err;
                data = data.toString();
                // 把用JSON编码的待办事项数据解析到任务数组中
                let tasks = JSON.parse(data || '[]');
                cb(tasks);
            });
        } else {
            // 如果.tasks文件不存在，则创建空的任务数组
            cb([]);
        }
    });
}

// ES6:
// async function loadOrInitializeTaskArrayA(file){
//     return new Promise((resolve,reject)=>{
//         fs.readFile(file, 'utf8', (err, data)=> {
//             if(err){
//                 reject(err);
//             }else{
//                 resolve(data);
//             }
//
//         });
//     });
// }
// function f(cb) {
//     loadOrInitializeTaskArrayA("").then((data)=>{
//         cb(data);
//     }).catch((err)=>{});
// }
// async function f1() {
//     await loadOrInitializeTaskArrayA("");
// }

// 列出任务
function listTasks(file) {
    loadOrInitializeTaskArray(file, function(tasks) {
        for(let i in tasks) {
            if(!tasks.hasOwnProperty(i)) {
                continue;
            }
            console.log(tasks[i]);
        }
    });
}

// 保存任务到磁盘中
function storeTasks(file, tasks) {
    fs.writeFile(file, JSON.stringify(tasks), 'utf8', function(err) {
        if (err) throw err;
        console.log('Saved.');
    });
}

// 添加一项任务
function addTask(file, taskDescription) {
    loadOrInitializeTaskArray(file, function(tasks) {
        tasks.push(taskDescription);
        storeTasks(file, tasks);
    });
}