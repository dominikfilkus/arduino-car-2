(function() {
    var socket = io.connect('http://localhost');
    var forwardState, backwardState, rightState, leftState ;

    document.onkeydown = checkKeyDown;
    document.onkeyup = checkKeyUp;

    function checkKeyDown(e) {
        if (e.keyCode == '38') {
            forwardState = true;
            socket.emit('servo_forward');
        }
        else if (e.keyCode == '40') {
            backwardState = true;
            socket.emit('servo_backward');
        }
        else if (e.keyCode == '37') {
            leftState = true;
            socket.emit('servo_left');
        }
        else if (e.keyCode == '39') {
            rightState = true;
            socket.emit('servo_right');
        }
    }

    function checkKeyUp(e) {
        if (e.keyCode == '38') {
            forwardState= false;

            if (leftState) {
                socket.emit('servo_left');
            } else if (rightState) {
                socket.emit('servo_right');
            } else {
                socket.emit('servo_stop');
            }
        }

        else if (e.keyCode == '40') {
            backwardState = false;
            if (leftState) {
                socket.emit('servo_left');
            } else if (rightState) {
                socket.emit('servo_right');
            } else {
                socket.emit('servo_stop');
            }
        }

        else if (e.keyCode == '37') {
            leftState = false;

            if (forwardState) {
                socket.emit('servo_forward');
            } else if (backwardState) {
                socket.emit('servo_backward');
            } else {
                socket.emit('servo_stop');
            }
        }

        else if (e.keyCode == '39') {
            rightState = false;

            if (forwardState) {
                socket.emit('servo_forward');
            } else if (backwardState) {
                socket.emit('servo_backward');
            } else {
                socket.emit('servo_stop');
            }
        }
    }
}());