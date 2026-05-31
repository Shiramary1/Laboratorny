import Form from "../components/form.js";
import Auth from "../services/auth.js";
import loading from "../services/loading.js";
import location from "../services/location.js";

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
        'name': (value) => {
            if (value.length < 3) {
                return 'Имя должно быть не короче 3 символов'
            } else if (value.length >= 32) {
                return 'Имя должно быть короче 32 символов'
            }

            return false
        },
        'age': (value) => {
            if (!value) {
                return 'Поле возраста обязательно'
            }

            const age = Number(value);

            if (Number.isNaN(age)) {
                return 'Возраст должен быть числом'
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
        },
        'password-repeat': (value, fields) => {
            const password = fields.find(field => field.name === 'password')

            if (password.input.value !== value) {
                return 'Пароли должны совпадать'
            }

            return false
        }
    }, async (values) => {
        delete values['password-repeat']

        try {
            loading.start()
            await Auth.reg(values)
        } catch (error) {
            alert(error.message || 'Не удалось зарегистрироваться')
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
