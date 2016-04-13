var servoControl = (function() {
    var forwardState, backwardState, rightState, leftState,
        socket = io.connect('http://localhost');

    var leftServo = document.querySelector('.servo__item--left__value'),
        rightServo = document.querySelector('.servo__item--right__value');

    /**
     * @name servoControl#moveServos
     * @public
     * @description Move the servos to the correct direction according to the keyCode
     * @param keyCode The code of the key which is pressed
     */
    var moveServos = function(keyCode) {
        switch (keyCode) {
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
    };

    /**
     * @name servoControl#stopServos
     * @public
     * @description Stop the servos according the moving directions
     * @param keyCode The code of the key which is pressed
     */
    var stopServos = function(keyCode) {
        switch (keyCode) {
            case 38:
                forwardState = false;
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
    };

    /**
     * @name smoothTurn
     * @private
     * @description If we move straight then turn parallel the servos won't stop
     * waiting for another keypress
     */
    var smoothTurn = function() {
        if (leftState) {
            socket.emit('servo_left');
        } else if (rightState) {
            socket.emit('servo_right');
        } else {
            socket.emit('servo_stop');
        }
    };

    /**
     * @name smoothTurn
     * @private
     * @description If we turn then move straight parallel the servos won't stop
     * waiting for another keypress
     */
    var smoothLineMovement = function() {
        if (forwardState) {
            socket.emit('servo_forward');
        } else if (backwardState) {
            socket.emit('servo_backward');
        } else {
            socket.emit('servo_stop');
        }
    };

    /**
     * @name bindEvents
     * @private
     * @description Bind all servo events
     */
    var bindEvents = function() {
        socket.on('left_servo_cw', function () {
            leftServo.innerHTML = 'CW';
        });

        socket.on('left_servo_ccw', function () {
            leftServo.innerHTML = 'CCW';
        });

        socket.on('left_servo_stop', function () {
            leftServo.innerHTML = 'IDLE';
        });

        socket.on('right_servo_cw', function () {
            rightServo.innerHTML = 'CW';
        });

        socket.on('right_servo_ccw', function () {
            rightServo.innerHTML = 'CCW';
        });

        socket.on('right_servo_stop', function () {
            rightServo.innerHTML = 'IDLE';
        });
    };

    bindEvents();

    return {
        moveServos: moveServos,
        stopServos: stopServos
    };
})();