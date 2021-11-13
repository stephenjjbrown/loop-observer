import { LoopSubscriber } from "./loop-subscriber";
export declare type AnySubscribable = Subscribable<any, any>;
export declare type ArrayOfSubscribables = AnySubscribable[];
export declare abstract class Subscribable<T, TDependencies extends ArrayOfSubscribables> {
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
