import { LoopSubscriber } from "./loop-subscriber";
export declare abstract class Subscribable<T, TDependencies extends Subscribable<any, any>[]> {
    id: number;
    previousValue: T;
    value: T;
    disposed: boolean;
    dependencies: TDependencies;
    dependents: LoopSubscriber<any, any>[];
    constructor(dependencies?: TDependencies);
    abstract evaluate(): any;
    addDependent(subscriber: LoopSubscriber<any, any>): void;
    removeDependent(id: number): void;
    dispose(): void;
}
