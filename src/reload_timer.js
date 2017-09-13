import { Messages } from './message_handler';

class ReloadTimer {

    constructor() {
        this._refreshTimeout = null;
        this._mouseMoveTimeout = this._setMouseMoveTimeout();
        window.addEventListener('mousemove',
            this._throttle(this._handleMouseMove));
    }

    _handleMouseMove = () => {
        console.info('mouse moved...');
        clearTimeout(this._mouseMoveTimeout);
        clearTimeout(this._refreshTimeout);
        this._mouseMoveTimeout = this._setMouseMoveTimeout();
    }

    _setMouseMoveTimeout = () => setTimeout(() => {
            console.info('mouse is idle');
            this._refreshTimeout = setTimeout(
                () => chrome.runtime.sendMessage(Messages.REFRESH),
                this._getRandomSec(120, 300) // 2-5 min
            );
        }, 10000);
    
    _getRandomSec = (min, max) => {
        const returnValue = Math.floor(Math.random() * (max - min + 1)) + min;
        console.info(`Refresh after(sec): ${returnValue}`);
        return returnValue * 1000;
    }

    _throttle = (functionToCall) => {
        let time = Date.now();
        return () => {
            if ((time + 1000 - Date.now()) < 0) {
                functionToCall();
                time = Date.now();
            }
        }
    }
}

export default ReloadTimer;
