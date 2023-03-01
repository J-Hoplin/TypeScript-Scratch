"use strict";
class Animal {
}
class Bird extends Animal {
    chrip() {
    }
}
class Crow extends Bird {
    caw() {
    }
}
function chirp(bird) {
}
function clone(cb) {
    let parent = new Bird();
    let baby = cb(parent);
    baby.chrip();
}
clone((bird) => Animal);
//# sourceMappingURL=type1.js.map