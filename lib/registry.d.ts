import { Subscribable, AnySubscribable } from "./subscribable";
declare class LoopObserverRegistry {
    private _observers;
    readonly observers: {
        [key: string]: Subscribable<any, any>[];
    };
    constructor();
    register(key: "read" | "calc" | "midwrite" | "recalc" | "write", observer: AnySubscribable): void;
    unregister(observer: AnySubscribable): void;
}
export declare const loopObserverRegistry: LoopObserverRegistry;
export {};
