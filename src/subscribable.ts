import { LoopSubscriber } from "./loop-subscriber";

export type AnySubscribable = Subscribable<any, any>; // Just to make the type annotations a little more readable but not strictly needed
export type ArrayOfSubscribables = AnySubscribable[];

// Maybe could be named something better?
export abstract class Subscribable<T, TDependencies extends ArrayOfSubscribables> {
    id: number;

    previousValue: T;
    value: T;

    disposed = false;

    dependencies: TDependencies;
    dependents: LoopSubscriber<any, any>[] = [];

    constructor(dependencies: TDependencies = [] as any) {
        this.id = Math.random();
        this.dependencies = dependencies;
    }

    abstract evaluate();//{
        // if (this.disposed)
        //     return;

        // if (this.dependents.length === 0)
        //     return; // Must have dependents to run

        // const newValue = this.action();
        // if (newValue != this.value) {
        //     this.value = newValue;
        //     this.dependents.forEach(d => d.needsUpdate = true);
        // }
    //}

    addDependent(subscriber: LoopSubscriber<any,any>) {
        this.dependents.push(subscriber);
    }

    removeDependent(id: number) {
        this.dependents.splice(this.dependents.findIndex(d => d.id === id), 1);
    }

    dispose() {
        this.disposed = true;

        this.dependencies.forEach(d => d.removeDependent(this.id));
        this.dependents.forEach(d => d.dispose());
    }
}