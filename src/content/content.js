import { Messages } from '../message_handler';
import ReloadTimer from '../reload_timer';
import AttackDetector from '../attack_detector';
import UiCleaner from '../ui_cleaner';
import LoginHandler from '../login_handler';

class ContentApp {

    constructor() {
        new ReloadTimer();
        UiCleaner.clearUi();
        if (LoginHandler.loggedOut()) LoginHandler.login();
        if (AttackDetector.isAttack()) {
            chrome.runtime.sendMessage(Messages.ATTACK);
        }
    }

}

new ContentApp();

