import { Siren } from './siren';
import { Messages } from './message_handler';

const NotificationIds = Object.freeze({
    ATTACK: 'attack',
});

class NotificationHandler {
    
    constructor(siren) {
        this._siren = siren;
        this._baseOptions = {
            type: 'basic',
            title: 'Travian event',
        }
    }

    showAttackNotification = (type) => {
        chrome.notifications.create(type,
            Object.assign(this._baseOptions, {
                iconUrl: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIzNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMSAyMWgyMkwxMiAyIDEgMjF6bTEyLTNoLTJ2LTJoMnYyem0wLTRoLTJ2LTRoMnY0eiIvPjwvc3ZnPg==',
                message: 'Incomming attack!',
                requireInteraction: true,
            })
        );
    }

    click = (id) => {
        switch (id) {
            case NotificationIds.ATTACK:
                this._siren.stop();
                break;
            default:
                console.error('Unknown id.');
        }
    }

    close = (id) => {
        switch (id) {
            case NotificationIds.ATTACK:
                this._siren.stop();
                break;
            default:
                console.error('Unknown id.');
        }
    }

}

export { NotificationIds, NotificationHandler };
