import { credentials } from '../credentials'; // FIXME
import { Messages } from '../message_handler';

class ContentApp {

    constructor() {
        this._autoLogin();
        this._initReloadTimer();
        this._hideUnnecessaryItems();
        this._checkForAttack();
    }

    _autoLogin = () => {
        const _loginForm = document.querySelector('form[name="login"]');
        if (!_loginForm || !credentials) return;
        _loginForm.querySelector('input[name="name"]').value = credentials.name;
        _loginForm.querySelector('input[name="password"]').value = atob(credentials.password);
        _loginForm.submit();
    }

    _initReloadTimer = () => {
        setTimeout(() => {
            chrome.runtime.sendMessage(Messages.REFRESH);
        }, _getRandomSec(120, 300)); // 2-5 min
        
        function _getRandomSec(min, max) {
            const returnValue = Math.floor(Math.random() * (max - min + 1)) + min;
            console.info(`Refresh time(sec): ${returnValue}`);
            return returnValue * 1000;
        }
    }

    _hideUnnecessaryItems = () => {
        const selectorList = [
            '#sidebarBoxLinklist',
            'li.gold, button.gold',
        ];
        for (const item of selectorList) {
            const elements = document.querySelectorAll(item);
            for (const element of elements) {
                element.style.display = 'none';
            }
        }
    }

    _checkForAttack = () => {
        if (_attackImage()) {
            chrome.runtime.sendMessage(Messages.ATTACK);
        }

        function _attackImage() {
            const attackImageName = 'att1.gif';
            const movementImagesSelector = '#movements td a img';
            const movementImages = document.querySelectorAll(movementImagesSelector);
            for (let i = 0; i < movementImages.length; ++i) {
                const bgImageValue = getComputedStyle(movementImages[i])['background-image'];
                if (bgImageValue.indexOf(attackImageName) > -1) {
                    return true;
                }
            }
            return false;
        }
    }
}

new ContentApp();

