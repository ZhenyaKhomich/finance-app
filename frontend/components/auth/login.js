import {Validation} from "../utils/validation";
import {AuthTokens} from "../utils/auth-utils";

export class Login {
    constructor(openNewRouteAutomatic) {
        this.openNewRouteAutomatic = openNewRouteAutomatic;
        this.inputsElement = document.querySelectorAll('.form-floating  input');
        this.rememberMeInput = document.getElementById('remember-meInput');
        this.errorLogin = document.getElementById('error-login');
        document.getElementById("loginBtn").addEventListener("click", this.login.bind(this));
    }

    async login() {
        if (Validation.validForm(this.inputsElement)) {
            const date = Validation.validForm(this.inputsElement);

            const result = await AuthTokens.getTokensAfterRegistration(date.emailInputElement, date.passwordInputElement, this.rememberMeInput.checked);
            if (result) {
                if (result.error || !result.tokens || !result.user) {
                    this.errorLogin.innerText = result.message;
                    return;
                } else {
                    this.errorLogin.innerText = '';
                }

                this.openNewRouteAutomatic('/');
                return

            }
                alert('Ошибка при запросе на сервер. Попробуйте снова!');
        }
    }
}