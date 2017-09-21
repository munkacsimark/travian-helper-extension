import Siren from '../siren';
import { MessageHandler } from '../message_handler';
import { NotificationHandler } from '../notification_handler';

class BackgroundApp {

    constructor() {
        this._siren = new Siren();
        this._messageHandler = new MessageHandler(this._siren);
        this._notificationHandler = new NotificationHandler(this._siren);

        this._attachEventListeners();
        chrome.browserAction.setBadgeText({text: ''});
        chrome.browserAction.setBadgeBackgroundColor({color: '#f00'});
    }

    _attachEventListeners = () => {
        chrome.runtime.onMessage
            .addListener(this._messageHandler.listen);
        chrome.notifications.onClicked
            .addListener(this._notificationHandler.click);
        chrome.notifications.onClosed
            .addListener(this._notificationHandler.close);
        chrome.notifications.onButtonClicked
            .addListener(this._notificationHandler.buttonClick);
    }
}

new BackgroundApp();
