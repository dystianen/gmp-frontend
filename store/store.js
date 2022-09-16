import {enableStaticRendering} from 'mobx-react-lite';
import {TokenUtil} from "../utils/token";
import {AuthenticationStore} from "./authentication";

enableStaticRendering(typeof window === 'undefined')

export class Store {
    authentication = new AuthenticationStore(this);

    constructor() {
        TokenUtil.loadToken();
        if (TokenUtil.accessToken) {
            this.authentication.isLoggedIn = true;
        }
    }

    hydrate = (data) => {
        if (!data) return;
    }
}
