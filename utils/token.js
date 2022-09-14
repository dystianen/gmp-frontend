const atob = require('atob');

export class TokenUtil {
    static accessToken = null;
    static refreshToken = null;
    static username = null;
    static password = null;

    static loadToken() {
        if (typeof window === "undefined") {
            return;
        }

        const accessToken = localStorage.getItem('access_token');
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');

        if (accessToken) {
            TokenUtil.setAccessToken(accessToken);
        }

        if (username) {
            TokenUtil.setUsername(username);
        }

        if (password) {
            TokenUtil.setPassword(password);
        }
    }

    static persistToken() {
        if (TokenUtil.accessToken != null) {
            localStorage.setItem('access_token', TokenUtil.accessToken);
        } else {
            localStorage.removeItem('access_token');
        }
    }

    static setAccessToken(accessToken) {
        TokenUtil.accessToken = accessToken;
    }

    static setUsername(username) {
        TokenUtil.username = username;
    }

    static setPassword(password) {
        TokenUtil.password = password;
    }

    static clearAccessToken() {
        TokenUtil.accessToken = null;
    }

    static decodedToken() {
        if (TokenUtil.accessToken) {
            return JSON.parse(atob(TokenUtil.accessToken.split('.')[1]));
        }
        return {}
    }
}
