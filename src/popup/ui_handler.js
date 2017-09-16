import { PopupMessages } from '../message_handler';

class UiHandler {

    constructor() {
        this.loginDataForm = document.querySelector('.login-data');
        this.attackDataForm = document.querySelector('.attack-data');
    }

    initView = (data) => {
        this.loginUserName = data[PopupMessages.USERNAME];
        this.loginPassword = data[PopupMessages.PASSWORD];
        this.autoLogin = data[PopupMessages.AUTO_LOGIN_ON];
        this.playSiren = data[PopupMessages.PLAY_SIREN];
        this.showNotification = data[PopupMessages.SHOW_NOTIFICATION];
        this.refreshFrom = data[PopupMessages.REFRESH_FROM];
        this.refreshTo = data[PopupMessages.REFRESH_TO];
    }

    get loginUserName() { return this.loginDataForm.querySelector('#user-name').value; }
    set loginUserName(username) { this.loginDataForm.querySelector('#user-name').value = username || ''; }

    get loginPassword() { return this.loginDataForm.querySelector('#password').value; }
    set loginPassword(password) { this.loginDataForm.querySelector('#password').value = password || ''; }

    get autoLogin() { return this.loginDataForm.querySelector('#login-automatically').checked; }
    set autoLogin(autoLogin) { this.loginDataForm.querySelector('#login-automatically').checked = autoLogin === undefined ? false : autoLogin; }

    get playSiren() { return this.attackDataForm.querySelector('#play-siren').checked; }
    set playSiren(playSiren) { this.attackDataForm.querySelector('#play-siren').checked = playSiren === undefined ? true : playSiren; }

    get showNotification() { return this.attackDataForm.querySelector('#show-notification').checked; }
    set showNotification(showNotification) { this.attackDataForm.querySelector('#show-notification').checked = showNotification === undefined ? true : showNotification; }

    get refreshFrom() { return this.attackDataForm.querySelector('#refresh-from').value; }
    set refreshFrom(refreshFrom) { this.attackDataForm.querySelector('#refresh-from').value = refreshFrom ? refreshFrom : 2; }

    get refreshTo() { return this.attackDataForm.querySelector('#refresh-to').value; }
    set refreshTo(refreshTo) { this.attackDataForm.querySelector('#refresh-to').value = refreshTo ? refreshTo : 5; }

    showLoginMessage(message, error) {
        this._showMessage(this.loginDataForm.querySelector('.setting-message'), message, error);
    }

    showAttackMessage(message, error) {
        this._showMessage(this.attackDataForm.querySelector('.setting-message'), message, error);
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
