import { LocalStorageKeys, LocalStorageService } from './local_storage_service';

const NotificationIds = Object.freeze({
    ATTACK: 'attack',
});

class NotificationHandler {
    
    constructor(siren) {
        this._storage = new LocalStorageService();
        this._siren = siren;
        this._baseOptions = {
            type: 'basic',
            title: 'Travian event',
        }
    }

    showNotification = (type, message) => {
        chrome.notifications.create(type,
            Object.assign(this._baseOptions, {
                iconUrl: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIzNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMSAyMWgyMkwxMiAyIDEgMjF6bTEyLTNoLTJ2LTJoMnYyem0wLTRoLTJ2LTRoMnY0eiIvPjwvc3ZnPg==',
                message: `Attack in: ${message} mins`,
                requireInteraction: true,
                buttons: [
                    { title: 'Turn off' },
                ]
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

    buttonClick = (id, btnIndex) => {
        switch (id) {
            case NotificationIds.ATTACK:
                switch (btnIndex) {
                    case 0:
                        this._storage.set({ [LocalStorageKeys.SNOOZE_ATTACK_NOTIFICATION]: true });
                        this._siren.stop();
                        break;
                }
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
