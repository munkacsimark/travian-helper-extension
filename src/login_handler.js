import { LocalStorageKeys, LocalStorageService } from './local_storage_service';

class LoginHandler {

    constructor() {
        this._storage = new LocalStorageService();
        this._loginForm = document.querySelector('form[name="login"]');
    }

    loggedOut = () => !!document.querySelector('form[name="login"]');

    login = () => {
        if (!this._loginForm || this._errorExists()) return;

        this._storage.get([
            LocalStorageKeys.USERNAME,
            LocalStorageKeys.PASSWORD,
            LocalStorageKeys.AUTO_LOGIN_ON,
        ]).then((credentials) => {
            if (!credentials[LocalStorageKeys.AUTO_LOGIN_ON]) {
                console.info('Auto login turned off.');
                return;
            }
            if (!credentials[LocalStorageKeys.USERNAME] || !credentials[LocalStorageKeys.PASSWORD]) {
                console.info('No credentials.');
                return;
            }
            this._loginForm.querySelector('input[name="name"]').value = credentials[LocalStorageKeys.USERNAME];
            this._loginForm.querySelector('input[name="password"]').value = credentials[LocalStorageKeys.PASSWORD];
            this._loginForm.submit();
        });
    }

    _errorExists = () => {
        let _error = false;
        for (let element of this._loginForm.querySelectorAll('.error')) {
            if ((element.innerHTML.trim() || {}).length > 0) {
                _error = true;
                break;
            }
        }
        return _error;
    }

}

export default LoginHandler;
