// Maybe could be named something better?
export class Subscribable {
    constructor(dependencies = []) {
        this.disposed = false;
        this.dependents = [];
        this.id = Math.random();
        this.dependencies = dependencies;
    }
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
    addDependent(subscriber) {
        this.dependents.push(subscriber);
    }
    removeDependent(id) {
        this.dependents.splice(this.dependents.findIndex(d => d.id === id), 1);
    }
    dispose() {
        this.disposed = true;
        this.dependencies.forEach(d => d.removeDependent(this.id));
        this.dependents.forEach(d => d.dispose());
    }
}
