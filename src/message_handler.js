import { NotificationIds, NotificationHandler } from './notification_handler';
import { LocalStorageKeys, LocalStorageService } from './local_storage_service';

const MessageActions = Object.freeze({
    REFRESH: 'refresh',
    ATTACK: 'attack',
    LOAD_LOGIN_DATA: 'load_login_data',
    SAVE_LOGIN_DATA: 'save_login_data',
    DELETE_LOGIN_DATA: 'delete_login_data',
});

const PopupMessages = Object.freeze({
    USERNAME: 'user_name',
    PASSWORD: 'password',
    CREDENTIALS_EXISTS: 'credentials_exists',
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
                this._notificationHandler.showNotification(NotificationIds.ATTACK);
                this._siren.loop();
                break;
            case MessageActions.LOAD_LOGIN_DATA:
                this._storage._getMultiple([
                    LocalStorageKeys.USERNAME,
                    LocalStorageKeys.PASSWORD,
                ]).then((response) => {
                    callback({
                        [PopupMessages.CREDENTIALS_EXISTS]: !!response[LocalStorageKeys.USERNAME] && !!response[LocalStorageKeys.PASSWORD]
                    });
                });
                break;
            case MessageActions.SAVE_LOGIN_DATA:
                this._storage._set({
                    [LocalStorageKeys.USERNAME]: message[PopupMessages.USERNAME],
                    [LocalStorageKeys.PASSWORD]: message[PopupMessages.PASSWORD],
                }).then(callback);
                break;
            case MessageActions.DELETE_LOGIN_DATA:
                //
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
};
