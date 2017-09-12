import { NotificationIds, NotificationHandler } from './notification_handler';

const Messages = Object.freeze({
    REFRESH: 'refresh',
    ATTACK: 'attack',
});

class MessageHandler {

    constructor(siren) {
        this._siren = siren;
        this._notificationHandler = new NotificationHandler();
    }

    listen = (request, sender) => {
        switch (request) {
            case Messages.REFRESH:
                chrome.tabs.reload(sender.tab.id);
                break;
            case Messages.ATTACK:
                this._notificationHandler.showAttackNotification(NotificationIds.ATTACK);
                this._siren.loop();
                break;
            default:
                console.error('Unknown request.');
        }
    }

}

export { Messages, MessageHandler };
