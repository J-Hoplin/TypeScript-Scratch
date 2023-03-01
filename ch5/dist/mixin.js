"use strict";
function withEZDebug(Class) {
    return class extends Class {
    };
}
class HardToDebug {
    constructor(id, firstname, lastname) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
    }
    getDebugValue() {
        return {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname
        };
    }
}
// debugs를 만족하게끔 강제된다.
let User = withEZDebug(HardToDebug);
console.log(User.prototype);
let user = new User(10, 'a', 'b');
user.getDebugValue();
//# sourceMappingURL=mixin.js.map