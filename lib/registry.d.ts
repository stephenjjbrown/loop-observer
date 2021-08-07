import { Subscribable } from "./subscribable";
declare class LoopObserverRegistry {
    private _observers;
    readonly observers: {
        [key: string]: Subscribable<any, any>[];
    };
    constructor();
    register(key: "read" | "calc" | "write", observer: Subscribable<any, any>): void;
    unregister(observer: Subscribable<any, any>): void;
}
export declare const loopObserverRegistry: LoopObserverRegistry;
export {};
