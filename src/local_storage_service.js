
const LocalStorageKeys = Object.freeze({
    USERNAME: 'user_name',
    PASSWORD: 'password',
    AUTO_LOGIN_ON: 'auto_login_on',
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

    set = (data) => {
        return this._set(data);
    }

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

    _clear = () => {
        chrome.storage.local.clear();
    }

}

export { LocalStorageKeys, LocalStorageService };
