import api from "../services/api.js";

const AuthRepository = {
    async me() {
        try {
            return await api('/me');
        } catch (error) {
            return await api('/refresh');
        }
    },

    async reg (values) {
        return await api('/registration', {
            method: 'POST',
            body: JSON.stringify(values)
        });
    },

    async login (values) {
        return await api('/login', {
            method: 'POST',
            body: JSON.stringify(values)
        });
    },

    async logout() {
        return await api('/logout', {
            method: "POST",
            body: JSON.stringify({})
        })
    },
}

export default AuthRepository
