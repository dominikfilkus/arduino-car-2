let forwardState, backwardState, rightState, leftState,
    socket = io.connect('http://localhost');

let leftServo = document.querySelector('.servo__item--left__value'),
    rightServo = document.querySelector('.servo__item--right__value');

/**
 * @name moveServos
 * @public
 * @description Move the servos to the correct direction according to the keyCode
 * @param keyCode The code of the key which is pressed
 */
let moveServos = (keyCode) => {
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
 * @name stopServos
 * @public
 * @description Stop the servos according the moving directions
 * @param keyCode The code of the key which is pressed
 */
let stopServos = (keyCode) => {
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
let smoothTurn = () => {
    if (leftState) {
        socket.emit('servo_left');
    } else if (rightState) {
        socket.emit('servo_right');
    } else {
        socket.emit('servo_stop');
    }
};

/**
 * @name smoothLineMovement
 * @private
 * @description If we turn then move straight parallel the servos won't stop
 * waiting for another keypress
 */
let smoothLineMovement = () => {
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
let bindEvents = () => {
    socket.on('left_servo_cw', () => {
        leftServo.innerHTML = 'CW';
    });

    socket.on('left_servo_ccw', () => {
        leftServo.innerHTML = 'CCW';
    });

    socket.on('left_servo_stop', () => {
        leftServo.innerHTML = 'IDLE';
    });

    socket.on('right_servo_cw', () => {
        rightServo.innerHTML = 'CW';
    });

    socket.on('right_servo_ccw', () => {
        rightServo.innerHTML = 'CCW';
    });

    socket.on('right_servo_stop', () => {
        rightServo.innerHTML = 'IDLE';
    });
};

bindEvents();

export {
    moveServos,
    stopServos
}