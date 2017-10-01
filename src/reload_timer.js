import { MessageActions } from './message_handler';
import { LocalStorageKeys } from './local_storage_service';
import { VillageHandler } from './village_handler';

class ReloadTimer {

    constructor() {
        this._refreshTimeout = null;
        this._mouseMoveTimeout = this._setMouseMoveTimeout();
        window.addEventListener('mousemove',
            this._throttle(this._handleMouseMove));
    }

    _handleMouseMove = () => {
        console.info('Mouse moved.');
        clearTimeout(this._mouseMoveTimeout);
        clearTimeout(this._refreshTimeout);
        this._mouseMoveTimeout = this._setMouseMoveTimeout();
    }

    _setMouseMoveTimeout = () => setTimeout(() => {
            console.info('Mouse is idle.');
            chrome.runtime.sendMessage({ action: MessageActions.GET_REFRESH_MINS }, (data) => {
                const from = data[LocalStorageKeys.REFRESH_FROM] || 2;
                const to = data[LocalStorageKeys.REFRESH_TO] || 5;
                if (parseInt(from) === 0 && parseInt(to) === 0) return;
                this._refreshTimeout = setTimeout(
                    () => chrome.runtime.sendMessage({
                        action: MessageActions.RELOAD,
                        villages: VillageHandler.getVillages(),
                        originalHref: location.href
                    }), this._getRandomSec(from, to)
                );
            });
        }, 10000);
    
    _getRandomSec = (min, max) => {
        const returnValue = Math.floor(Math.random() * (max * 60000 - min * 60000 + 1)) + min * 60000;
        console.info(`Refreshing after ${(returnValue / 60000).toFixed(2)} mins.`);
        return returnValue;
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
