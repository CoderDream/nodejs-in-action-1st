let fs = require('fs');
let completedTasks = 0;
let tasks = [];
let wordCounts = {};
let filesDir = './text';

// 当所有任务全部完成后，列出文件中用到的每个单词以及用了多少次
function checkIfComplete() {
    completedTasks++;
    if (completedTasks === tasks.length) {
        for (let index in wordCounts) {
            if(!wordCounts.hasOwnProperty(index)) {
                continue;
            }
            console.log(index +': ' + wordCounts[index]);
        }
    }
}

function countWordsInText(text) {
    let words = text
        .toString()
        .toLowerCase()
        .split(/\W+/)
        .sort();
    // 对文本中出现的单词计数
    for (let index in words) {
        let word = words[index];
        if (word) {
            wordCounts[word] =
                (wordCounts[word]) ? wordCounts[word] + 1 : 1;
        }
    }
}

// 得出text目录中的文件列表
fs.readdir(filesDir, function(err, files) {
    if (err) {
      throw err;
    }

    for(let index in files) {
        // 定义处理每个文件的任务。
        // 每个任务中都会调用一个异步读取文件的函数并对文件中使用的单词计数
        let task = (function(file) {
            return function() {
                fs.readFile(file, function(err, text) {
                    if (err) throw err;
                    countWordsInText(text);
                    checkIfComplete();
                });
            }
        })(filesDir + '/' + files[index]);
        // 把所有任务都添加到函数调用数组中
        tasks.push(task);
    }
    // 开始并行执行所有的任务
    for(let task in tasks) {
        tasks[task]();
    }
});