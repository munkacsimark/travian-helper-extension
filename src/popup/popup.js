import UiHandler from './ui_handler';
import { MessageActions, PopupMessages } from '../message_handler';

class PopupApp {

    constructor() {
        this._ui = new UiHandler();

        this._initUi();
        this._handleLoginDataForm();
        this._handleAttackDataForm();
        this._handleOtherDataForm();
    }

    _handleLoginDataForm = () => {
        this._ui.loginDataForm.addEventListener('submit', this._loginDataSubmitHandler);
        this._ui.loginDataForm.querySelector('.login-data-clear').addEventListener('click', this._loginDataDeleteHandler);
    }

    _handleAttackDataForm = () => {
        this._ui.attackDataForm.addEventListener('submit', this._attackDataSubmitHandler);
        this._ui.attackDataForm.querySelector('.siren-test').addEventListener('click', this._playSirenHandler);
    }

    _handleOtherDataForm = () => {
        this._ui.otherDataForm.addEventListener('submit', this._otherDataSubmitHandler);
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

    _attackDataSubmitHandler = (event) => {
        event.preventDefault();
        if (parseInt(this._ui.refreshFrom) > parseInt(this._ui.refreshTo)) {
            this._ui.showAttackMessage('"From" can\'t be bigger than "to".', true);
            return;
        }
        chrome.runtime.sendMessage({
            action: MessageActions.SAVE_ATTACK_DATA,
            [PopupMessages.PLAY_SIREN]: this._ui.playSiren,
            [PopupMessages.SHOW_NOTIFICATION]: this._ui.showNotification,
            [PopupMessages.REFRESH_FROM]: this._ui.refreshFrom,
            [PopupMessages.REFRESH_TO]: this._ui.refreshTo,
        }, this._ui.showAttackMessage('Attack data saved.', false));
    }

    _loginDataDeleteHandler = () => {
        chrome.runtime.sendMessage({
            action: MessageActions.DELETE_LOGIN_DATA
        }, this._ui.showLoginMessage('Credentials deleted.', false));
        this._ui.autoLogin = false;
        this._ui.loginUserName = '';
        this._ui.loginPassword = '';
    }

    _otherDataSubmitHandler = (event) => {
        event.preventDefault();
        chrome.runtime.sendMessage({
            action: MessageActions.SAVE_OTHER_DATA,
            [PopupMessages.HIDE_GOLD]: this._ui.hideGold,
        }, this._ui.showOtherMessage('Settings saved.', false));
    }

    _playSirenHandler = () => {
        chrome.runtime.sendMessage({ action: MessageActions.TEST_SIREN });
    }

    _initUi = () => {
        chrome.runtime.sendMessage({
            action: MessageActions.LOAD_POPUP_DATA,
        }, this._ui.initView);
    }

}

document.addEventListener('readystatechange', function() {
    if (document.readyState === 'interactive') {
        new PopupApp();
    }
});
