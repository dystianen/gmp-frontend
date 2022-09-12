import { action, observable, computed, runInAction, makeObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite';
import { useMemo } from 'react'
import {Sample, SampleStore} from "./sample";
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === 'undefined')

let store;

export class Store {
    sample = new SampleStore(this);

    constructor() {
    }

    hydrate = (data) => {
        if (!data) return;
    }
}
