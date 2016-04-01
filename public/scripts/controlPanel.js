(function() {
    var socket = io.connect('http://localhost');

    document.onkeydown = checkKeyDown;
    document.onkeyup = checkKeyUp;

    function checkKeyDown(e) {
        if (e.keyCode == '38') {
            socket.emit('servo_forward');
        }
        else if (e.keyCode == '40') {
            socket.emit('servo_backward');
        }
        else if (e.keyCode == '37') {
            socket.emit('servo_left');
        }
        else if (e.keyCode == '39') {
            socket.emit('servo_right');
        }
    }

    function checkKeyUp(e) {
        if (e.keyCode == '38') {
            socket.emit('servo_stop');
        }
        else if (e.keyCode == '40') {
            socket.emit('servo_stop');
        }
        else if (e.keyCode == '37') {
            socket.emit('servo_front_stop');
        }
        else if (e.keyCode == '39') {
            socket.emit('servo_front_stop');
        }
    }
}());