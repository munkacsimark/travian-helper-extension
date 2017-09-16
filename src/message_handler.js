import { NotificationIds, NotificationHandler } from './notification_handler';
import { LocalStorageKeys, LocalStorageService } from './local_storage_service';

const MessageActions = Object.freeze({
    REFRESH: 'refresh',
    ATTACK: 'attack',
    LOAD_POPUP_DATA: 'load_popup_data',
    SAVE_LOGIN_DATA: 'save_login_data',
    DELETE_LOGIN_DATA: 'delete_login_data',
    TEST_SIREN: 'test_siren',
    SAVE_ATTACK_DATA: 'save_attack_data',
    GET_REFRESH_MINS: 'get_refresh_mins',
    SAVE_OTHER_DATA: 'save_other_data',
    HIDE_GOLD: 'hide_gold',
    SET_BADGE: 'set_badge',
});

const PopupMessages = Object.freeze({
    USERNAME: 'user_name',
    PASSWORD: 'password',
    AUTO_LOGIN_ON: 'auto_login_on',
    PLAY_SIREN: 'play_siren',
    SHOW_NOTIFICATION: 'show_notification',
    REFRESH_FROM: 'refresh_from',
    REFRESH_TO: 'refresh_to',
    HIDE_GOLD: 'hide_gold',
});

const BadgeMessages = Object.freeze({
    BADGE_TEXT: 'badge_text',
    BADGE_COLOR: 'badge_color',
});

class MessageHandler {

    constructor(siren) {
        this._siren = siren;
        this._notificationHandler = new NotificationHandler();
        this._storage = new LocalStorageService();
    }

    listen = (message, sender, callback) => {
        switch (message.action) {
            case MessageActions.REFRESH:
                chrome.tabs.reload(sender.tab.id);
                break;
            case MessageActions.ATTACK:
                chrome.browserAction.setBadgeText({text: 'Atck'});
                this._storage.get([
                    LocalStorageKeys.PLAY_SIREN,
                    LocalStorageKeys.SHOW_NOTIFICATION,
                ]).then((response) => {
                    const notification = response[LocalStorageKeys.SHOW_NOTIFICATION] === undefined || response[LocalStorageKeys.SHOW_NOTIFICATION];
                    const siren = response[LocalStorageKeys.PLAY_SIREN] === undefined || response[LocalStorageKeys.PLAY_SIREN];
                    if (siren) {
                        notification ? this._siren.loop() : this._siren.play();
                    }
                    if (notification) {
                        this._notificationHandler.showNotification(NotificationIds.ATTACK);
                    }
                });
                break;
            case MessageActions.LOAD_POPUP_DATA:
                this._storage.get([
                    LocalStorageKeys.USERNAME,
                    LocalStorageKeys.PASSWORD,
                    LocalStorageKeys.AUTO_LOGIN_ON,
                    LocalStorageKeys.PLAY_SIREN,
                    LocalStorageKeys.SHOW_NOTIFICATION,
                    LocalStorageKeys.REFRESH_FROM,
                    LocalStorageKeys.REFRESH_TO,
                    LocalStorageKeys.HIDE_GOLD,
                ]).then((response) => {
                    callback({
                        [PopupMessages.USERNAME]: response[LocalStorageKeys.USERNAME],
                        [PopupMessages.PASSWORD]: response[LocalStorageKeys.PASSWORD],
                        [PopupMessages.AUTO_LOGIN_ON]: response[LocalStorageKeys.AUTO_LOGIN_ON],
                        [PopupMessages.PLAY_SIREN]: response[LocalStorageKeys.PLAY_SIREN],
                        [PopupMessages.SHOW_NOTIFICATION]: response[LocalStorageKeys.SHOW_NOTIFICATION],
                        [PopupMessages.REFRESH_FROM]: response[LocalStorageKeys.REFRESH_FROM],
                        [PopupMessages.REFRESH_TO]: response[LocalStorageKeys.REFRESH_TO],
                        [PopupMessages.HIDE_GOLD]: response[LocalStorageKeys.HIDE_GOLD],
                    });
                });
                break;
            case MessageActions.SAVE_LOGIN_DATA:
                this._storage.set({
                    [LocalStorageKeys.USERNAME]: message[PopupMessages.USERNAME],
                    [LocalStorageKeys.PASSWORD]: message[PopupMessages.PASSWORD],
                    [LocalStorageKeys.AUTO_LOGIN_ON]: message[PopupMessages.AUTO_LOGIN_ON],
                }).then(callback);
                break;
            case MessageActions.DELETE_LOGIN_DATA:
                this._storage.remove([
                    LocalStorageKeys.USERNAME,
                    LocalStorageKeys.PASSWORD,
                    LocalStorageKeys.AUTO_LOGIN_ON,
                ]).then(callback);
                break;
            case MessageActions.TEST_SIREN:
                this._siren.play();
                break;
            case MessageActions.SAVE_ATTACK_DATA:
                this._storage.set({
                    [LocalStorageKeys.PLAY_SIREN]: message[PopupMessages.PLAY_SIREN],
                    [LocalStorageKeys.SHOW_NOTIFICATION]: message[PopupMessages.SHOW_NOTIFICATION],
                    [LocalStorageKeys.REFRESH_FROM]: message[PopupMessages.REFRESH_FROM],
                    [LocalStorageKeys.REFRESH_TO]: message[PopupMessages.REFRESH_TO],
                }).then(callback);
                break;
            case MessageActions.GET_REFRESH_MINS:
                this._storage.get([
                    LocalStorageKeys.REFRESH_FROM,
                    LocalStorageKeys.REFRESH_TO,
                ]).then(callback);
                break;
            case MessageActions.SAVE_OTHER_DATA:
                this._storage.set({
                    [LocalStorageKeys.HIDE_GOLD]: message[PopupMessages.HIDE_GOLD],
                }).then(callback);
                break;
            default:
                console.error('Unknown request.');
        }
        return true;
    }

}

export {
    MessageActions,
    MessageHandler,
    PopupMessages,
    BadgeMessages,
};
