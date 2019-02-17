export declare class LoopObserver<T> {
    action: () => T;
    id: number;
    value: T;
    runAlways: boolean;
    needsUpdate: boolean;
    dependents: LoopObserver<any>[];
    constructor(action: () => T, dependencies?: LoopObserver<any>[]);
    run(): void;
}
declare class LoopObserverRegistry {
    private _observers;
    readonly observers: {
        [key: string]: LoopObserver<any>[];
    };
    constructor();
    register(key: "read" | "calc" | "write", observer: LoopObserver<any>): void;
    unregister(observer: LoopObserver<any>): void;
}
export declare const loopObserverRegistry: LoopObserverRegistry;
export declare const observe: <T>(key: "read" | "calc" | "write", action: () => T, dependencies?: LoopObserver<any>[]) => LoopObserver<T>;
export declare const read: <T>(action: () => T, dependencies?: LoopObserver<any>[]) => LoopObserver<T>;
export declare const write: <T>(action: () => T, dependencies?: LoopObserver<any>[]) => LoopObserver<T>;
export declare const calc: <T>(action: () => T, dependencies?: LoopObserver<any>[]) => LoopObserver<T>;
export declare const stopObserving: (observer: LoopObserver<any>) => void;
export {};
