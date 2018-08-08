
// 净化内容
function divEscapedContentElement(message) {
    return $('<div></div>').text(message);
}

// 显示系统创建的受信内容
function divSystemContentElement(message) {
    return $('<div></div>').html('<i>' + message + '</i>');
}

// 处理原始的用户输入
function processUserInput(chatApp) {
    let message_object = $('#send-message');
    let message = message_object.val();
    let messages_object = $('#messages');
    let systemMessage;
    // 如果用户输入的内容以斜杠(/)开头，将其作为聊天命令
    if (message.charAt(0) === '/') {
        systemMessage = chatApp.processCommand(message);
        if (systemMessage) {
            messages_object.append(divSystemContentElement(systemMessage));
        }
    } else {
        // 将非命令输入广播给其他用户
        chatApp.sendMessage($('#room').text(), message);
        messages_object.append(divEscapedContentElement(message));
        messages_object.scrollTop((messages_object).prop('scrollHeight'));
    }
    // 清空输入框
    message_object.val('');
}

let socket = io.connect();
$(document).ready(function() {
    let chatApp = new Chat(socket);

    // 显示更名尝试的结果
    socket.on('nameResult', function(result) {
        let message;
        if (result.success) {
            message = 'You are now known as ' + result.name + '.';
        } else {
            message = result.message;
        }
        $('#messages').append(divSystemContentElement(message));
    });

    // 显示房间变更结果
    socket.on('joinResult', function(result) {
        $('#room').text(result.room);
        $('#messages').append(divSystemContentElement('Room changed.'));
    });

    // 显示接收到的消息
    socket.on('message', function (message) {
        let newElement = $('<div></div>').text(message.text);
        $('#messages').append(newElement);
    });

    // 显示可用房间列表
    socket.on('rooms', function(rooms) {
        let room_list_object = $('#room-list');
        room_list_object.empty();
        for(let room in rooms) {
            if(!rooms.hasOwnProperty(room)) {
                continue;
            }
            room = room.substring(1, room.length);
            if (room !== '') {
                room_list_object.append(divEscapedContentElement(room));
            }
        }

        // 点击房间名可以换到那个房间中
        $('#room-list div').click(function() {
            chatApp.processCommand('/join ' + $(this).text());
            $('#send-message').focus();
        });
    });

    // 定期请求可用房间列表
    setInterval(function() {
        socket.emit('rooms');
    }, 1000);


    $('#send-message').focus();

    // 提交
    $('#send-form').submit(function() {
        processUserInput(chatApp, socket);
        return false;
    });
});