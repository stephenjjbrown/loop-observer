import { LoopSubscriber } from "./loop-subscriber";
import { Subscribable } from "./subscribable";

// Maybe could be named something better?
export class LoopObserver<T> extends Subscribable<T, any> {
    constructor(public action: () => T) {
        super();
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