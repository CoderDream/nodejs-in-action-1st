










## 3.3.2 实现串行化流程控制 ##
package.json
```javascript
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "repository": {
    "type": "git",
    "url": "git@github.com:CoderDream/nodejs-in-action-1st.git"
  },
  "dependencies": {
    "request": "~2.87.0",
    "htmlparser": "~1.7.7"
  }
}
```
random_story.js

```javascript
let fs = require('fs');
let request = require('request');
let htmlparser = require('htmlparser');
let configFilename = './rss_feeds.txt';

// 任务1：确保包含RSS预订源URL列表的文件存在
function checkForRSSFile () {
    fs.exists(configFilename, function(exists) {
        if (!exists) {
            // 只要有错误就尽早返回
            return next(new Error('Missing RSS file: ' + configFilename));
        }
        next(null, configFilename);
    });
}

// 任务2：读取并解析包含预订源URL的文件
function readRSSFile (configFilename) {
    fs.readFile(configFilename, function(err, feedList) {
        if (err) {
            return next(err);
        }
        // 将预订源URL列表转换成字符串，然后分隔成一个数组
        let feedListString = feedList
            .toString()
            .replace(/^\s+|\s+$/g, '')
            .split("\n");
        // 从预订源URL数组中随机选择一个预订源URL
        let random = Math.floor(Math.random()*feedListString.length);
        next(null, feedListString[random]);
    });
}

// 任务3：向选定的预订源发送HTTP请求获取数据
function downloadRSSFeed (feedUrl) {
    request({uri: feedUrl}, function(err, res, body) {
        if (err) {
            return next(err);
        }
        if (res.statusCode !== 200) {
            return next(new Error('Abnormal response status code'));
        }
        next(null, body);
    });
}

// 任务4：将预订源数据解析到一个条目数组中
function parseRSSFeed (rss) {
    let handler = new htmlparser.RssHandler();
    let parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);
    //if (!handler.dom.length || !handler.dom.items.length ) {
    if (!handler.dom.items.length ) {
        return next(new Error('No RSS items found'));
    }
    let item = handler.dom.items.shift();
    // 如果有数据，显示第一个预订源条目的标题和URL
    console.log(item.title);
    console.log(item.link);
}

// 把所有要做的任务按执行顺序添加到一个数组中
let tasks = [ checkForRSSFile,
    readRSSFile,
    downloadRSSFeed,
    parseRSSFeed ];

// 负责执行任务的函数
function next(err, result) {
    // 如果任务出错，则抛出异常
    if (err) {
        throw err;
    }

    // 从任务数组中取出下个任务
    let currentTask = tasks.shift();
    if (currentTask) {
        // 执行当前任务
        currentTask(result);
    }
}

// 开始任务的串行化执行
next();
```

rss_feeds.txt
```shell
http://feed.cnblogs.com/blog/sitehome/rss
http://feed.cnblogs.com/blog/sitecateogry/java/rss
http://feed.cnblogs.com/blog/sitecateogry/javascript/rss
https://www.cnbeta.com/backend.php
```



运行结果：
```shell
"D:\Java\WebStorm 2018.2\bin\runnerw.exe" 
D:\nodejs10_8_0_x64\node.exe --inspect-brk=58170 D:\Java\GitHub\nodejs-in-action-1st\ch03\ch030302\random_story.js
Debugger listening on ws://127.0.0.1:58170/8c66c62c-72c3-4ac7-8afa-7e5155e8a17c
For help, see: https://nodejs.org/en/docs/inspector
Android P正式发布 华为四款机型将吃上第一口“馅饼”
https://www.cnbeta.com/articles/tech/755473.htm
Debugger attached.
Waiting for the debugger to disconnect...

Process finished with exit code -1073741510 (0xC000013A: interrupted by Ctrl+C)
```

## 3.3.3 实现并行化流程控制##

在一个简单的程序中实现并行化流程控制 

```javascript
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
```

运行结果：
```shell
a: 4
all: 2
although: 1
among: 1
and: 14
angels: 1
arms: 1
as: 4
ascending: 1
at: 4
backed: 1
based: 1
...
underneath: 1
waters: 1
were: 1
william: 1
would: 1

Process finished with exit code 0

```

```shell

```

```shell

```

```shell

```

```shell

```

```shell

```

```shell

```
