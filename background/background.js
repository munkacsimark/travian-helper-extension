var siren = new Audio('./assets/Red Alert-SoundBible.com-108009997.mp3');

(function() {
    chrome.runtime.onMessage.addListener(messageHandler);
    chrome.notifications.onClicked.addListener(notificationClickHandler);
    chrome.notifications.onClosed.addListener(notificationCloseHandler);
})();

function messageHandler(request, sender, sendResponse) {
    switch (request) {
        case 'REFRESH':
            chrome.tabs.reload(sender.tab.id);
            break;
        case 'ATTACK':
            chrome.notifications.create('attack', {
                type: 'basic',
                iconUrl: './assets/ic_warning_black_36px.svg',
                title: 'Travian incomming attack!',
                message: '',
                requireInteraction: true
            });
            _playSiren();
            break;
    }
}

function notificationClickHandler(id) {
    if (id !== 'attack') return;
    _stopSiren();
}

function notificationCloseHandler(id) {
    if (id !== 'attack') return;
    _stopSiren();
}

function _playSiren() {
    siren.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    siren.play();
}

function _stopSiren() {
    siren.pause();
    siren.currentTime = 0;
}
