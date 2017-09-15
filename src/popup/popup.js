import UiHandler from './ui_handler';
import { MessageActions, PopupMessages } from '../message_handler';

class PopupApp {

    constructor() {
        this._ui = new UiHandler();

        this._initUi();
        this._handleLoginDataForm();
    }

    _handleLoginDataForm = () => {
        this._ui.loginDataForm.addEventListener('submit', this._loginDataSubmitHandler);
        this._ui.loginDataForm.querySelector('.login-data-clear').addEventListener('click', this._loginDataDeleteHandler);
    }

    _loginDataSubmitHandler = (event) => {
        event.preventDefault();
        chrome.runtime.sendMessage({
            action: MessageActions.SAVE_LOGIN_DATA,
            [PopupMessages.USERNAME]: this._ui.loginUserName,
            [PopupMessages.PASSWORD]: this._ui.loginPassword,
            [PopupMessages.AUTO_LOGIN_ON]: this._ui.autoLogin,
        }, this._ui.showLoginMessage('Credentials saved.', false));
    }

    _loginDataDeleteHandler = () => {
        chrome.runtime.sendMessage({ action: MessageActions.DELETE_LOGIN_DATA });
        this._ui.autoLogin = false;
        this._ui.loginUserName = '';
        this._ui.loginPassword = '';
        this._ui.showLoginMessage('Credentials deleted.', false);
    }

    _initUi = () => {
        chrome.runtime.sendMessage({
            action: MessageActions.LOAD_LOGIN_DATA,
        }, this._ui.initView);
    }

}

document.addEventListener('readystatechange', function() {
    if (document.readyState === 'interactive') {
        new PopupApp();
    }
});
