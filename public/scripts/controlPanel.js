(function() {
    var socket = io.connect('http://localhost');
    var forwardState, backwardState, rightState, leftState ;

    document.onkeydown = checkKeyDown;
    document.onkeyup = checkKeyUp;

    function checkKeyDown(e) {
        switch (e.keyCode) {
            case 38:
                forwardState = true;
                socket.emit('servo_forward');
                break;
            case 40:
                backwardState = true;
                socket.emit('servo_backward');
                break;
            case 37:
                leftState = true;
                socket.emit('servo_left');
                break;
            case 39:
                rightState = true;
                socket.emit('servo_right');
                break;
        }
    }

    function checkKeyUp(e) {
        switch (e.keyCode) {
            case 38:
                forwardState= false;
                smoothTurn();
                break;
            case 40:
                backwardState = false;
                smoothTurn();
                break;
            case 37:
                leftState = false;
                smoothLineMovement();
                break;
            case 39:
                rightState = false;
                smoothLineMovement();
                break;
        }
    }

    function smoothTurn() {
        if (leftState) {
            socket.emit('servo_left');
        } else if (rightState) {
            socket.emit('servo_right');
        } else {
            socket.emit('servo_stop');
        }
    }

    function smoothLineMovement() {
        if (forwardState) {
            socket.emit('servo_forward');
        } else if (backwardState) {
            socket.emit('servo_backward');
        } else {
            socket.emit('servo_stop');
        }
    }
}());