import { Subscribable } from "./subscribable";
// // Typescript's Mapped Tuple syntax
// type ValueFromSubscribables<T extends Subscribable<any, any>[]> = { [K in keyof T]: T[K] extends Subscribable<any, any> ? ValueFromSubscribable<T[K]> : never}
export class LoopSubscriber extends Subscribable {
    constructor(action, ...dependencies) {
        super(dependencies);
        this.action = action;
        this.needsUpdate = true;
        this.dependencies.forEach(d => d.addDependent(this));
    }
    evaluate() {
        if (this.disposed)
            return;
        if (!this.needsUpdate)
            return;
        const newValue = this.action(...this.dependencies.map(d => d.value));
        if (newValue != this.value) {
            this.previousValue = this.value;
            this.value = newValue;
            this.dependents.forEach(d => d.needsUpdate = true);
        }
        this.needsUpdate = false;
    }
}
