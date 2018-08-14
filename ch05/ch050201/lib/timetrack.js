let qs = require('querystring');

// 发送HTML响应
exports.sendHtml = function (res, html) {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
};

// 解析HTTP POST数据
exports.parseReceivedData = function (req, cb) {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        let data = qs.parse(body);
        cb(data);
    });
};

// 渲染简单的表单
exports.actionForm = function (id, path, label) {
    let html = '<form method="POST" action="' + path + '">' +
        '<input type="hidden" name="id" value="' + id + '">' +
        '<input type="submit" value="' + label + '" />' +
        '</form>';
    console.log('html: ' + html);
    return html;
};

// 添加工作记录
exports.add = function (db, req, res) {
    // 解析HTTP POST数据
    exports.parseReceivedData(req, function (work) {
        // 添加工作记录的SQL
        db.query(
            "INSERT INTO work (hours, date, description) " +
            " VALUES (?, ?, ?)",
            // 工作记录数据
            [work.hours, work.date, work.description],
            function (err) {
                if (err) throw err;
                // 给用户显示工作记录清单
                exports.show(db, res);
            }
        );
    });
};

// 删除工作记录
exports.delete = function (db, req, res) {
    // 解析HTTP POST数据
    exports.parseReceivedData(req, function (work) {
        // 删除工作记录的SQL
        db.query(
            "DELETE FROM work WHERE id=?",
            // 工作记录ID
            [work.id],
            function (err) {
                if (err) throw err;
                // 给用户显示工作记录清单
                exports.show(db, res);
            }
        );
    });
};

// 归档一条工作记录
exports.archive = function (db, req, res) {
    exports.parseReceivedData(req, function (work) {
        // 更新工作记录的SQL
        db.query(
            "UPDATE work SET archived=1 WHERE id=?",
            // 工作记录ID
            [work.id],
            function (err) {
                if (err) throw err;
                // 给用户显示工作记录清单
                exports.show(db, res);
            }
        );
    });
};

// 获取工作记录
exports.show = function (db, res, showArchived) {
    // 获取工作记录的SQL
    let query = "SELECT * FROM work " +
        "WHERE archived=? " +
        "ORDER BY date DESC";
    let archiveValue = (showArchived) ? 1 : 0;
    db.query(
        query,
        // 想要的工作记录归档状态
        [archiveValue],
        function (err, rows) {
            if (err) throw err;
            let html = (showArchived)
                ? ''
                : '<a href="//archived">Archived Work</a><br/>';
            // 将结果格式化为HTML表格
            html += exports.workHitlistHtml(rows);
            html += exports.workFormHtml();
            // 给用户发送HTML响应
            exports.sendHtml(res, html);
        }
    );
};

// 显示归档的工作记录
exports.showArchived = function (db, res) {
    exports.show(db, res, true);
};

// 将工作记录渲染为HTML表格
exports.workHitlistHtml = function (rows) {
    let html = '<table>';
    for (let i in rows) {
        if(!rows.hasOwnProperty(i)) {
            continue;
        }
        html += '<tr>';
        html += '<td>' + rows[i].date + '</td>';
        html += '<td>' + rows[i].hours + '</td>';
        html += '<td>' + rows[i].description + '</td>';
        if (!rows[i].archived) {
            html += '<td>' + exports.workArchiveForm(rows[i].id) + '</td>';
        }
        html += '<td>' + exports.workDeleteForm(rows[i].id) + '</td>';
        html += '</tr>';
    }
    html += '</table>';
    console.log('html: ' + html);
    return html;
};

// 用来添加、归档、删除工作记录的HTML表单
exports.workFormHtml = function () {
    let html = '<form method="POST" action="/">' +
        // 渲染用来输入新工作记录的空白HTML表单
        '<p>Date (YYYY-MM-DD):<br/><input name="date" type="text"><p/>' +
        '<p>Hours worked:<br/><input name="hours" type="text"><p/>' +
        '<p>Description:<br/>' +
        '<textarea name="description"></textarea></p>' +
        '<input type="submit" value="Add" />' +
        '</form>';
    console.log('html: ' + html);
    return html;
};

// 渲染归档按钮表单
exports.workArchiveForm = function (id) {
    return exports.actionForm(id, '/archive', 'Archive');
};

// 渲染删除按钮表单
exports.workDeleteForm = function (id) {
    return exports.actionForm(id, '/delete', 'Delete');
};
