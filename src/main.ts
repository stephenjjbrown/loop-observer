
import { ValueFromSubscribables, LoopSubscriber, ValueFromSubscribable } from "./loop-subscriber";
import { LoopObserver } from "./loop-observer";
import { loopObserverRegistry } from "./registry";
import { Subscribable, ArrayOfSubscribables } from "./subscribable";



export const observe = <T, D extends ArrayOfSubscribables>(key: "calc" | "write" | "midwrite" | "recalc", action: (...args: ValueFromSubscribables<D>) => T, ...dependencies: D) => {
    const observer = new LoopSubscriber(action, ...dependencies);
    loopObserverRegistry.register(key, observer);
    return observer;
};



export const read = <T>(action: () => T) => {
    const observer = new LoopObserver(action);
    loopObserverRegistry.register("read", observer);
    return observer;
};

export const write = <T, D extends ArrayOfSubscribables>(action: (...args: ValueFromSubscribables<D>) => T, ...dependencies: D) => observe("write", action, ...dependencies);
export const calc = <T, D extends ArrayOfSubscribables>(action: (...args: ValueFromSubscribables<D>) => T, ...dependencies: D) => observe("calc", action, ...dependencies);
export const midwrite = <T, D extends ArrayOfSubscribables>(action: (...args: ValueFromSubscribables<D>) => T, ...dependencies: D) => observe("midwrite", action, ...dependencies);
export const recalc = <T, D extends ArrayOfSubscribables>(action: (...args: ValueFromSubscribables<D>) => T, ...dependencies: D) => observe("recalc", action, ...dependencies);

export const stopObserving = (observer: LoopSubscriber<any, any>) => loopObserverRegistry.unregister(observer);


const test = read(() => document.body.clientHeight);
write((t) => t, test);