import { Subscribable } from "./subscribable";

type ValueFromSubscribable<T extends Subscribable<any, any>> = T["value"];
// Extract the value from a Loop Observer using TypeScripts strange Mapped tuple syntax. 
export type MapTuple<T extends Subscribable<any, any>[]> = { [K in keyof T]: T[K] extends LoopSubscriber<any, any> ? ValueFromSubscribable<T[K]> : never };


export class LoopSubscriber<T, TDependencies extends Subscribable<any, any>[]> extends Subscribable<T, TDependencies> {
    needsUpdate = true;

    constructor(public action: (...args: MapTuple<TDependencies>) => T, ...dependencies: TDependencies) {
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