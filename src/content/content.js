import { credentials } from '../credentials';

(function() {
    autoLogin();
    initReloadTimer();
    hideUnnecessaryItems();
    checkForAttack();
})();

function autoLogin() {
    var loginForm = document.querySelector('form[name="login"]');
    if (!loginForm || !credentials) return;
    loginForm.querySelector('input[name="name"]').value = credentials.name;
    loginForm.querySelector('input[name="password"]').value = atob(credentials.password);
    loginForm.submit();
}

function initReloadTimer() {
    setTimeout(_refreshTab, _getRandomSec(120, 300)); // 2-5 min

    function _refreshTab() {
        chrome.runtime.sendMessage('REFRESH');
    }

    function _getRandomSec(minSec, maxSec) {
        var min = Math.ceil(minSec);
        var max = Math.floor(maxSec);
        var returnValue = Math.floor(Math.random() * (max - min + 1)) + min;
        console.info('Refresh time(sec): ' + returnValue);
        return returnValue * 1000; // to millisec
    }
}

function hideUnnecessaryItems() {
    var selectorList = [
        '#sidebarBoxLinklist',
        'li.gold, button.gold',
    ];
    for (var item of selectorList) {
        var elements = document.querySelectorAll(item);
        for (var element of elements) {
            element.style.display = 'none';
        }
    }
}

function checkForAttack() {
    if (_attackImage()) {
        chrome.runtime.sendMessage('ATTACK');
    }

    function _attackImage() {
        var attackImageName = 'att1.gif';
        var movementImagesSelector = '#movements td a img';
        var movementImages = document.querySelectorAll(movementImagesSelector);
        for (var i = 0; i < movementImages.length; ++i) {
            var bgImageValue = getComputedStyle(movementImages[i])['background-image'];
            if (bgImageValue.indexOf(attackImageName) > -1) {
                return true;
            }
        }
        return false;
    }
}

