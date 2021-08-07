import { MapTuple, LoopSubscriber } from "./loop-subscriber";
import { LoopObserver } from "./loop-observer";
import { Subscribable } from "./subscribable";
export declare const observe: <T, D extends Subscribable<any, any>[]>(key: "calc" | "write", action: (...args: MapTuple<D>) => T, ...dependencies: D) => LoopSubscriber<T, D>;
export declare const read: <T>(action: () => T) => LoopObserver<T>;
export declare const write: <T, D extends Subscribable<any, any>[]>(action: (...args: MapTuple<D>) => T, ...dependencies: D) => LoopSubscriber<T, D>;
export declare const calc: <T, D extends Subscribable<any, any>[]>(action: (...args: MapTuple<D>) => T, ...dependencies: D) => LoopSubscriber<T, D>;
export declare const stopObserving: (observer: LoopSubscriber<any, any>) => void;
