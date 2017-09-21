import { MessageActions, ContentMessages, BadgeMessages } from '../message_handler';
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

        // login
        if (location.pathname === '/logout.php' && this._login.loggedOut()) {
            setTimeout(this._login.login, 10000);
        }

        // check for attack
        if (location.pathname === '/dorf1.php') {
            this._storage.get([LocalStorageKeys.SNOOZE_ATTACK_NOTIFICATION]).then((response) => {
                const attackTimeInMins = Math.ceil(AttackDetector.isAttackAndTime() / 60);
                console.log(attackTimeInMins);
                if (attackTimeInMins === 0) {
                    this._storage.set({ [LocalStorageKeys.SNOOZE_ATTACK_NOTIFICATION]: false });
                    chrome.runtime.sendMessage({ action: MessageActions.SET_BADGE });
                    return;
                }
                chrome.runtime.sendMessage({
                    action: MessageActions.SET_BADGE,
                    [BadgeMessages.BADGE_COLOR]: '#f00',
                    [BadgeMessages.BADGE_TEXT]: `${attackTimeInMins}m`
                });
                if (response[LocalStorageKeys.SNOOZE_ATTACK_NOTIFICATION]) return;
                chrome.runtime.sendMessage({
                    action: MessageActions.ATTACK,
                    [ContentMessages.ATTACK_TIME]: attackTimeInMins,
                });
            });
        }

        // hide gold related stuff
        this._storage.get([LocalStorageKeys.HIDE_GOLD]).then((response) => {
            if (response[LocalStorageKeys.HIDE_GOLD] === undefined || response[LocalStorageKeys.HIDE_GOLD]) {
                UiCleaner.clearUi();
            }
        });
    }

}

new ContentApp();

