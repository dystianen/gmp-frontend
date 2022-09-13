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
        const refreshToken = localStorage.getItem('refresh_token');
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');

        if (accessToken) {
            TokenUtil.setAccessToken(accessToken);
        }

        if (refreshToken) {
            TokenUtil.setRefreshToken(refreshToken);
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

        if (TokenUtil.refreshToken != null) {
            localStorage.setItem('refresh_token', TokenUtil.refreshToken);
        } else {
            localStorage.removeItem('refresh_token');
        }
    }

    static setAccessToken(accessToken) {
        TokenUtil.accessToken = accessToken;
    }

    static setRefreshToken(refreshToken) {
        TokenUtil.refreshToken = refreshToken;
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

    static clearRefreshToken() {
        TokenUtil.refreshToken = null;
    }

    static setRememberMe() {
        if (TokenUtil.username != null) {
            localStorage.setItem('username', TokenUtil.username);
        } else {
            localStorage.removeItem('username');
        }

        if (TokenUtil.password != null) {
            localStorage.setItem('password', TokenUtil.password);
        } else {
            localStorage.removeItem('password');
        }
    }

    static decodedToken() {
        if (TokenUtil.accessToken) {
            return JSON.parse(atob(TokenUtil.accessToken.split('.')[1]));
        }
        return {}
    }
}
