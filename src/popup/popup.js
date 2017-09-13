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
    }

    _loginDataSubmitHandler = (event) => {
        event.preventDefault();
        chrome.runtime.sendMessage({
            action: MessageActions.SAVE_LOGIN_DATA,
            [PopupMessages.USERNAME]: this._ui.loginUserName,
            [PopupMessages.PASSWORD]: this._ui.loginPassword,
        }, this._showMessage('Credentials saved.'));
    }

    _showMessage = (message) => {
        this._ui.showMessage(message);
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
