import { LoopSubscriber } from "./loop-subscriber";
import { LoopObserver } from "./loop-observer";
import { loopObserverRegistry } from "./registry";
export const observe = (key, action, ...dependencies) => {
    const observer = new LoopSubscriber(action, ...dependencies);
    loopObserverRegistry.register(key, observer);
    return observer;
};
export const read = (action) => {
    const observer = new LoopObserver(action);
    loopObserverRegistry.register("read", observer);
    return observer;
};
export const write = (action, ...dependencies) => observe("write", action, ...dependencies);
export const calc = (action, ...dependencies) => observe("calc", action, ...dependencies);
export const stopObserving = (observer) => loopObserverRegistry.unregister(observer);
