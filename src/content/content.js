import { MessageActions } from '../message_handler';
import { LocalStorageKeys, LocalStorageService } from '../local_storage_service';
import ReloadTimer from '../reload_timer';
import AttackDetector from '../attack_detector';
import UiCleaner from '../ui_cleaner';
import LoginHandler from '../login_handler';

class ContentApp {

    constructor() {
        this._login = new LoginHandler();
        this._storage = new LocalStorageService();
        new ReloadTimer();

        if (this._login.loggedOut()) {
            setTimeout(this._login.login, 10000);
        }
        if (AttackDetector.isAttack()) {
            chrome.runtime.sendMessage({ action: MessageActions.ATTACK });
        }
        this._storage.get([
            LocalStorageKeys.HIDE_GOLD
        ]).then((response) => {
            if (response[LocalStorageKeys.HIDE_GOLD] === undefined || response[LocalStorageKeys.HIDE_GOLD]) {
                UiCleaner.clearUi();
            }
        });
    }

}

new ContentApp();

