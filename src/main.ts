
import { MapTuple, LoopSubscriber } from "./loop-subscriber";
import { LoopObserver } from "./loop-observer";
import { loopObserverRegistry } from "./registry";
import { Subscribable } from "./subscribable";



export const observe = <T, D extends Subscribable<any, any>[]>(key: "calc" | "write", action: (...args: MapTuple<D>) => T, ...dependencies: D) => {
    const observer = new LoopSubscriber(action, ...dependencies);
    loopObserverRegistry.register(key, observer);
    return observer;
};

export const read = <T>(action: () => T) => {
    const observer = new LoopObserver(action);
    loopObserverRegistry.register("read", observer);
    return observer;
};
export const write = <T, D extends Subscribable<any, any>[]>(action: (...args: MapTuple<D>) => T, ...dependencies: D) => observe("write", action, ...dependencies);
export const calc = <T, D extends Subscribable<any, any>[]>(action: (...args: MapTuple<D>) => T, ...dependencies: D) => observe("calc", action, ...dependencies);

export const stopObserving = (observer: LoopSubscriber<any, any>) => loopObserverRegistry.unregister(observer);