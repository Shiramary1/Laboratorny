import Form from "../components/form.js";
import Auth from "../services/auth.js";
import location from "../services/location.js";
import loading from "../services/loading.js";

const init = async () => {
    const { ok: isLogged } = await Auth.me()

    if (isLogged) {
        return location.user()
    } else {
        loading.stop()
    }

    const formEl = document.getElementById('login-form')

    new Form(formEl, {
        'email': (value) => {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
                return 'Некорректный email'
            }

            return false
        },
        'password': (value) => {
            if (value.length < 6) {
                return 'Пароль должен быть не короче 6 символов'
            } else if (value.length >= 32) {
                return 'Пароль должен быть короче 32 символов'
            }

            return false
        }
    }, async (values) => {
        try {
            loading.start()
            await Auth.login(values)
        } catch (error) {
            alert(error.message || 'Не удалось выполнить вход')
        } finally {
            loading.stop()
        }
    })
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", init)
} else {
    init()
}
