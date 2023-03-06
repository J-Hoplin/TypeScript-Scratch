"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function BirdToAnimal(bird) {
    return new Animal();
}
function BirdToCrow(bird) {
    return new Crow();
}
/**
 * TS2345: Argument of type '(bird: Bird) => typeof Animal' is not assignable to parameter of type 'BirdCallback'.
  Property 'chrip' is missing in type 'typeof Animal' but required in type 'Bird'.
 *
 */
// clone(BirdToAnimal)
clone(BirdToCrow);
class API {
    constructor(options) {
        this.options = options;
    }
}
new API({
    baseURL: 'url',
    tier: 'prod'
});
/**
 * 오류가 난다.
 *
 */
// new API({
//     baseURL: 'url',
//     tierr: 'prod'
// })
// 타입스크립트는 프로퍼티 확인이라는 기능이 있다. 만약 존재하지 않는프로퍼티를 할당하면 오류가 난다.
// as T 문법을 이용해서 as assertion을 통해서 초과 프로퍼티 검사 수행을 수행하지 않을 수 있다.
new API({
    baseURL: 'url',
    tierr: 'prod'
});
const a1 = 'count';
/**
 * Record타입 -> 매핑하는 용도이다.
 *
 * 객체가 특정 키 집합을 정의하도록 강제하는 방법중 하나이다.
 *
 * Record<Keys, Types> 형태이다.
 *
 * Keys -> 키들의 타입이다
 *
 * Types -> 값들의 타입이다.
 *
 */
let nextDay = {
    Mon: 'Tue',
    Tue: 'Wed',
    Wed: 'Thu',
    Thu: 'Fri',
    Fri: 'Sat'
};
let nextDay2 = {
    Mon: "Mon",
    Tue: "Mon",
    Wed: "Mon",
    Thu: "Mon",
    Fri: "Mon"
};
/**
 * 내장된 매핑된 타입
 *
 * 타입스크립트는 다양한 내장 매핑 타입이 존재한다.
 *
 * Partial<typeof Object> : Object의 모든 필드를 선택형으로 표시
 *
 * Required<typeof Object> : Object의 모든 필드를 필수로 표시
 *
 * Readonly<typeof Object> : Object의 모든 필드를 읽기 전용으로 표시
 */
let testobj = {
    test1: 10,
    test2: 20,
    test3: 'string30'
};
let partialObject = {
    test1: 10,
    test2: 20
};
let requiredObject = {
    test1: 0,
    test2: 0,
    test3: ""
};
/**
 * 타입과 값 네임스페이스가 따로 있다는 점을 이용하였다
 *
 *
 * 동일한 이름이지만, 하나의 이름으로 값, 타입 모두 정의할 수 있다.
 *
 */
const companion_1 = require("./companion");
let amount = {
    unit: 'EUR',
    value: 100
};
console.log(companion_1.Currency.from(100, 'EUR'));
let user1;
user1 = {
    name: 'max',
    age: 30,
    greet(phrase) {
    }
};
const intfunc = (from, to) => {
    return 'a';
};
function intfunc2(from, toOrDestination) {
    if (typeof from === 'number') {
        return 'a';
    }
    else {
        return 10;
    }
}
intfunc('a', 'b');
console.log(intfunc2(10));
//# sourceMappingURL=type1.js.map