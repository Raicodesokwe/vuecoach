
let timer;

export default {
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        })
    },
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        })
    },
    async auth(context, payload) {
        const mode = payload.mode;
        let url = process.env.VUE_APP_SIGN_IN

        if (mode === 'signup') {
            url = process.env.VUE_APP_SIGN_UP
        }
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })
        const responseData = await response.json();
        if (!response.ok) {
            console.log(responseData);
            const error = new Error(responseData.message || 'Unable to signup.Please check your details and try again');
            throw error;
        }
        const expiresIn = +responseData.expiresIn * 1000;
        // const expiresIn = 10000;
        const expirationDate = new Date().getTime() + expiresIn

        localStorage.setItem('token', responseData.idToken)
        localStorage.setItem('userId', responseData.localId)
        localStorage.setItem('tokenExpiration', expirationDate)

        timer = setTimeout(function () {
            context.dispatch('autoLogout')
        }, expiresIn)

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,

        })
    },

    tryLogin(context) {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        const tokenExpiration = localStorage.getItem('tokenExpiration')

        const expiresIn = +tokenExpiration - new Date().getTime();

        if (expiresIn < 0) {
            return;
        }

        timer = setTimeout(function () {
            context.dispatch('autoLogout')
        }, expiresIn)

        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,

            })
        }
    },

    logout(context) {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('tokenExpiration')
        clearTimeout(timer)

        context.commit('setUser', {
            token: null,
            userId: null,

        })
    },
    autoLogout(context) {
        context.dispatch('logout')
        context.commit('setAutoLogout')
    }

}