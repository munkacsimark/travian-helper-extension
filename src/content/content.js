import { MessageActions } from '../message_handler';
import ReloadTimer from '../reload_timer';
import AttackDetector from '../attack_detector';
import UiCleaner from '../ui_cleaner';
import LoginHandler from '../login_handler';

class ContentApp {

    constructor() {
        this._login = new LoginHandler();
        new ReloadTimer();
        UiCleaner.clearUi();
        if (this._login.loggedOut()) {
            setTimeout(this._login.login, 10000);
        }
        if (AttackDetector.isAttack()) {
            chrome.runtime.sendMessage({ action: MessageActions.ATTACK });
        }
    }

}

new ContentApp();

