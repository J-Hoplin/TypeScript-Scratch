type ClassConstructor<T> = new (...args: any[]) => T

interface debugs {
    getDebugValue(): object
}

function withEZDebug<C extends ClassConstructor<debugs>>(Class: C) {
    return class extends Class {

    }
}

class HardToDebug {
    constructor(
        private id: number,
        private firstname: string,
        private lastname: string
    ) {

    }

    getDebugValue() {
        return {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname
        }
    }
}

// debugs를 만족하게끔 강제된다.
let User = withEZDebug(HardToDebug);
console.log(User.prototype)
let user = new User(10, 'a', 'b');
user.getDebugValue()