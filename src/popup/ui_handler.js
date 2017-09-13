import { PopupMessages } from '../message_handler';

class UiHandler {

    constructor() {
        this._messageBar = document.querySelector('.message-bar');
        this._loginDataForm = document.querySelector('.login-data');
    }

    showMessage = (message) => {
        this._messageBar.innerText = message;
    } 

    initView = (data) => {
        console.log(data);
        this.showMessage(
            data[PopupMessages.CREDENTIALS_EXISTS]
                ? 'Credentials exists.'
                : 'No credentials.'
        );
    }

    get loginDataForm() {
        return this._loginDataForm;
    }

    get loginUserName() {
        return this.loginDataForm.querySelector('#user-name').value;
    }

    get loginPassword() {
        return this.loginDataForm.querySelector('#password').value;
    }
}

export default UiHandler;
