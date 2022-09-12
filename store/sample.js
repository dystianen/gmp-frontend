import {makeAutoObservable} from "mobx";

export class SampleStore {
    testObs = 0;
    ctx;

    constructor(ctx) {
        makeAutoObservable(this);
        this.ctx = ctx;
    }

    setTestObs(testObs) {
        this.testObs = testObs;
    }
}
