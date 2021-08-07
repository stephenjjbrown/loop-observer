import { Subscribable } from "./subscribable";
// Maybe could be named something better?
export class LoopObserver extends Subscribable {
    constructor(action) {
        super();
        this.action = action;
    }
    evaluate() {
        if (this.disposed)
            return;
        if (this.dependents.length === 0)
            return; // Must have dependents to run
        const newValue = this.action();
        if (newValue != this.value) {
            this.previousValue = this.value;
            this.value = newValue;
            this.dependents.forEach(d => d.needsUpdate = true);
        }
    }
}
