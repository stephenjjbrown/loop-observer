import { Subscribable, AnySubscribable, ArrayOfSubscribables } from "./subscribable";

export type ValueFromSubscribable<T extends AnySubscribable> = T["value"];

// Extract the value from a Loop Observer using TypeScripts strange Mapped tuple syntax. 
export type ValueFromSubscribables<T extends ArrayOfSubscribables> = { [K in keyof T]: T[K] extends AnySubscribable ? ValueFromSubscribable<T[K]> : never };

// // Typescript's Mapped Tuple syntax
// type ValueFromSubscribables<T extends Subscribable<any, any>[]> = { [K in keyof T]: T[K] extends Subscribable<any, any> ? ValueFromSubscribable<T[K]> : never}


export class LoopSubscriber<T, TDependencies extends ArrayOfSubscribables> extends Subscribable<T, TDependencies> {
    needsUpdate = true;

    constructor(public action: (...args: ValueFromSubscribables<TDependencies>) => T, ...dependencies: TDependencies) {
        super(dependencies);

        this.dependencies.forEach(d => d.addDependent(this));
    }

    evaluate() {
        if (this.disposed)
            return;

        if (!this.needsUpdate)
            return;

        const newValue = this.action(...this.dependencies.map(d => d.value) as any);
        if (newValue != this.value) {
            this.previousValue = this.value;
            this.value = newValue;
            this.dependents.forEach(d => d.needsUpdate = true);
        }

        this.needsUpdate = false;
    }

    // removeDependent(id: number) {
    //     this.dependents.splice(this.dependents.findIndex(d => d.id === id), 1);
    // }

    // dispose() {
    //     this.disposed = true;

    //     this.dependencies.forEach(d => d.removeDependent(this.id));
    //     this.dependents.forEach(d => d.dispose());
    // }
}