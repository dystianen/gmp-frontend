import {makeAutoObservable, runInAction} from "mobx";
import {authenticationRepository} from "../repository/authentication";
import {TokenUtil} from "../utils/token";

export class AuthenticationStore {
    isLoggedIn = false;
    ctx;

    constructor(ctx) {
        makeAutoObservable(this);
        this.ctx = ctx;
    }

    async login({username, password}) {
        try {
            const result = await authenticationRepository.api.login({username, password})
            TokenUtil.setAccessToken(result.accessToken);
            TokenUtil.persistToken();

            TokenUtil.setUsername(null);
            TokenUtil.setPassword(null);

            runInAction(() => {
                this.isLoggedIn = true;
            });
        } catch (e) {
            throw e;
        }
    }

    logout() {
        TokenUtil.clearAccessToken();
        TokenUtil.persistToken();
        this.isLoggedIn = false;
    }
}
