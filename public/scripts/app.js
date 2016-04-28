import {moveServos, stopServos} from './servoControl';
import {switchLEDs} from './ledControl';

document.onkeydown = checkKeyDown;
document.onkeyup = checkKeyUp;

function checkKeyDown(e) {
    moveServos(e.keyCode);
    switchLEDs(e.keyCode);
}

function checkKeyUp(e) {
    stopServos(e.keyCode);
}
