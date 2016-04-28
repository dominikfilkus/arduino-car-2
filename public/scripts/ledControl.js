let turnedOn,
    socket = io.connect('http://localhost');

/**
 * @name switchLEDs
 * @public
 * @description Switch the state of the LEDs between on and off.
 * @param keyCode The code of the key which is pressed
 */
let switchLEDs = (keyCode) => {
    if (keyCode === 32) {
        if (turnedOn) {
            socket.emit('leds_off');
            turnedOn = false;
        } else {
            socket.emit('leds_on');
            turnedOn = true;
        }
    }
};

export {
    switchLEDs
}