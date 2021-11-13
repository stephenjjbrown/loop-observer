import { Subscribable, AnySubscribable, ArrayOfSubscribables } from "./subscribable";
export declare type ValueFromSubscribable<T extends AnySubscribable> = T["value"];
export declare type ValueFromSubscribables<T extends ArrayOfSubscribables> = {
    [K in keyof T]: T[K] extends AnySubscribable ? ValueFromSubscribable<T[K]> : never;
};
export declare class LoopSubscriber<T, TDependencies extends ArrayOfSubscribables> extends Subscribable<T, TDependencies> {
    action: (...args: ValueFromSubscribables<TDependencies>) => T;
    needsUpdate: boolean;
    constructor(action: (...args: ValueFromSubscribables<TDependencies>) => T, ...dependencies: TDependencies);
    evaluate(): void;
}
