import { loop } from "dom-loop";
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
        let start = -1;
        loop.read(() => {
            start = performance.now();
            this.observers.read.forEach(o => o.evaluate());
            this.observers.calc.forEach(o => o.evaluate());
            // setTimeout(() => {
            //     this.observers.calc.forEach(o => o.run());
            //     // One-time write, queued after each calc cycle runs
            //     //this.observers.write.forEach(o => o.run())
            // }, 0);
        }, false);
        loop.write(() => {
            this.observers.write.forEach(o => o.evaluate());
            let difference = performance.now() - start;
            if (difference > 2000) {
                console.warn("Frame animations took longer than 2ms");
            }
        }, false);
    }
    // TODO: rename to observers
    get observers() {
        // check if sort needed ... lazy sorting more efficient?
        // if (needsSort) sort();
        return this._observers;
    }
    register(key, observer) {
        //console.log("registering", observer);
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
