import { PopupMessages } from '../message_handler';

class UiHandler {

    constructor() {
        this._loginDataForm = document.querySelector('.login-data');
    }

    initView = (data) => {
        this.loginUserName = data[PopupMessages.USERNAME];
        this.loginPassword = data[PopupMessages.PASSWORD];
        this.autoLogin = data[PopupMessages.AUTO_LOGIN_ON];
    }

    get loginDataForm() { return this._loginDataForm; }

    get loginUserName() { return this.loginDataForm.querySelector('#user-name').value; }
    set loginUserName(username) { this.loginDataForm.querySelector('#user-name').value = username || ''; }

    get loginPassword() { return this.loginDataForm.querySelector('#password').value; }
    set loginPassword(password) { this.loginDataForm.querySelector('#password').value = password || ''; }

    get autoLogin() { return this.loginDataForm.querySelector('#login-automatically').checked; }
    set autoLogin(autoLogin) { this.loginDataForm.querySelector('#login-automatically').checked = autoLogin === undefined ? false : autoLogin; }

    showLoginMessage(message) {
        this._showMessage(this.loginDataForm.querySelector('.setting-message'), message, false);
    }

    _showMessage = (element, message, error) => {
        element.innerText = message;
        if (error !== undefined) {
            element.classList.add(error ? 'error' : 'success');
        }
        element.classList.add('show');
        var timeout = setTimeout(function() {
            element.classList.remove(['show', 'error', 'success']);
            element.innerText = '';
            clearTimeout(timeout);
        }, 3000);
    }
}

export default UiHandler;
