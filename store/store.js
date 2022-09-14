import {enableStaticRendering} from 'mobx-react-lite';
import {AuthenticationStore} from "./authentication";

enableStaticRendering(typeof window === 'undefined')

export class Store {
    authentication = new AuthenticationStore(this);

    constructor() {
    }

    hydrate = (data) => {
        if (!data) return;
    }
}
