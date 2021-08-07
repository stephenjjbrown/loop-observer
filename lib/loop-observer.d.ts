import { Subscribable } from "./subscribable";
export declare class LoopObserver<T> extends Subscribable<T, any> {
    action: () => T;
    constructor(action: () => T);
    evaluate(): void;
}
