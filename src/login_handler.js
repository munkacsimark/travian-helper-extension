import { credentials } from './credentials'; // FIXME

class LoginHandler {

    static loggedOut = () => !!document.querySelector('form[name="login"]');

    static login = () => {
        const _loginForm = document.querySelector('form[name="login"]');
        if (!_loginForm || !credentials) return;
        _loginForm.querySelector('input[name="name"]').value = credentials.name;
        _loginForm.querySelector('input[name="password"]').value = atob(credentials.password);
        _loginForm.submit();
    }

}

export default LoginHandler;
