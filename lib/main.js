import { animationLoop } from "dom-loop";
// Maybe could be named something better?
export class LoopObserver {
    constructor(action, dependencies) {
        this.action = action;
        this.needsUpdate = true;
        this.dependents = [];
        this.id = Math.random();
        if (!dependencies)
            this.runAlways = true;
        else
            dependencies.forEach(d => d.dependents.push(this));
    }
    run() {
        if (!this.runAlways && !this.needsUpdate)
            return;
        if (this.runAlways && this.dependents.length === 0)
            return; // Must either have dependencies or dependents
        const newValue = this.action();
        if (newValue != this.value) {
            this.value = newValue;
            this.dependents.forEach(d => d.needsUpdate = true);
        }
        if (!this.runAlways)
            this.needsUpdate = false;
    }
}
// Todo: store dependencies as graph and do topological sort to figure out function call order
// In the meantime, they should be roughly in the correct order because of typescript / bundling dependency management
class LoopObserverRegistry {
    // Lazy compute edges based on whether _edges has been nullified
    // private _edges = null;
    // get edges() {
    //     if (this._edges == null) {
    //         // Generate edges
    //     }
    //     return this._edges;
    // }
    constructor() {
        //private needsSort = false;
        this._observers = {
            read: [],
            calc: [],
            write: []
        };
        animationLoop.read(() => {
            this.observers.read.forEach(o => o.run());
            //this.observers.calc.forEach(o => o.run());
            setTimeout(() => {
                this.observers.calc.forEach(o => o.run());
                // One-time write, queued after each calc cycle runs
                //this.observers.write.forEach(o => o.run())
            }, 0);
        }, false);
        animationLoop.write(() => this.observers.write.forEach(o => o.run()), false);
    }
    // TODO: rename to observers
    get observers() {
        // check if sort needed ... lazy sorting more efficient?
        // if (needsSort) sort();
        return this._observers;
    }
    register(key, observer) {
        this.observers[key].push(observer);
        // needsSort = true; // Invalidate current order 
    }
    unregister(observer) {
        const keys = Object.keys(this.observers);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            for (let j = 0; j < this.observers[key].length; j++) {
                const o = this.observers[key][j];
                if (o == observer) {
                    this.observers[key].splice(j, 1);
                    return;
                }
            }
        }
    }
}
export const loopObserverRegistry = new LoopObserverRegistry();
export const observe = (key, action, dependencies) => {
    const observer = new LoopObserver(action, dependencies);
    loopObserverRegistry.register(key, observer);
    return observer;
};
export const read = (action, dependencies) => observe("read", action, dependencies);
export const write = (action, dependencies) => observe("write", action, dependencies);
export const calc = (action, dependencies) => observe("calc", action, dependencies);
export const stopObserving = (observer) => loopObserverRegistry.unregister(observer);
