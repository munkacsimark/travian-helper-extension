
const LocalStorageKeys = Object.freeze({
    USERNAME: 'user_name',
    PASSWORD: 'password',
    AUTO_LOGIN_ON: 'auto_login_on',
    PLAY_SIREN: 'play_siren',
    SHOW_NOTIFICATION: 'show_notification',
    REFRESH_FROM: 'refresh_from',
    REFRESH_TO: 'refresh_to',
    HIDE_GOLD: 'hide_gold',
    SNOOZE_ATTACK_NOTIFICATION: 'snooze_attack_notification',
    VILLAGES_TO_CHECK: 'villages_to_check',
    ORIGINAL_HREF: 'original_href',
});

class LocalStorageService {

    get = (key) => {
        if (Array.isArray(key)) {
            return this._getMultiple(key);
        } else if (typeof key === 'string') {
            return this._getSingle(key);
        } else {
            console.info('Invalid local storage key(s).');
        }
    }

    set = (data) => this._set(data);

    clear = () => this._clear();

    remove = (data) => this._remove(data);

    _getSingle = (key) => {
        return new Promise((resolve) => {
            chrome.storage.local.get(key, function(response) {
                resolve(key === LocalStorageKeys.PASSWORD
                    ? atob(response[key])
                    : response[key]);
            });
        });
    }

    _getMultiple = (keys) => {
        return new Promise((resolve) => {
            chrome.storage.local.get(keys, function(response) {
                if (response[LocalStorageKeys.PASSWORD]) {
                    response[LocalStorageKeys.PASSWORD] = atob(response[LocalStorageKeys.PASSWORD]);
                }
                resolve(response);
            });
        });
    }

    _set = (data) => {
        return new Promise((resolve) => {
            if (data[LocalStorageKeys.PASSWORD]) {
                data[LocalStorageKeys.PASSWORD] = btoa(data[LocalStorageKeys.PASSWORD]);
            }
            chrome.storage.local.set(data, resolve);
        });
    }

    _remove = (data) => chrome.storage.local.remove(data);

    _clear = () => chrome.storage.local.clear();

}

export { LocalStorageKeys, LocalStorageService };
