import { Subscribable } from "./subscribable";
declare type ValueFromSubscribable<T extends Subscribable<any, any>> = T["value"];
export declare type MapTuple<T extends Subscribable<any, any>[]> = {
    [K in keyof T]: T[K] extends LoopSubscriber<any, any> ? ValueFromSubscribable<T[K]> : never;
};
export declare class LoopSubscriber<T, TDependencies extends Subscribable<any, any>[]> extends Subscribable<T, TDependencies> {
    action: (...args: MapTuple<TDependencies>) => T;
    needsUpdate: boolean;
    constructor(action: (...args: MapTuple<TDependencies>) => T, ...dependencies: TDependencies);
    evaluate(): void;
}
export {};
