class Siren {

    constructor() {
        this._audio = new Audio('./assets/alert.mp3');
    }

    play = () => {
        this._audio.play();
    }

    loop = () => {
        this._audio.addEventListener('ended', () => {
            this.currentTime = 0;
            this.play();
        }, false);
        this.play();
    }

    pause = () => {
        this._audio.pause();
    }

    stop = () => {
        this.pause();
        this._audio.currentTime = 0;
    }
}

export default Siren;
