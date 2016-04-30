let turnedOn,
    socket = io.connect('http://localhost');

let ledValue = document.getElementsByClassName('led__item__value')[0];

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

/**
 * @name bindEvents
 * @private
 * @description Bind all led events
 */
let bindEvents = () => {
    socket.on('leds_on', () => {
        ledValue.innerHTML = 'On';
    });

    socket.on('leds_off', () => {
        ledValue.innerHTML = 'Off';
    });
};

bindEvents();

export {
    switchLEDs
}