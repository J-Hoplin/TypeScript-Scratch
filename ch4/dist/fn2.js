"use strict";
/**
 * 호출 시그니처
 *
 * 함수 전체 타입을 표현하는 방법을 알아보자
 *
 * 일반적으로 아래와 같이 함서 하나가 정의되어있다면 이 함수의 타입은 `Function`이다.
 */
function sum10(a, b) {
    return a + b;
}
/**
 *
 * @param message -> number type
 * @param userId -> number type
 * @returns -> number type
 */
let sum11 = (message, userId) => {
    return message + userId;
};
/**
 * 다른 예시로 콜백함수 f를 n번 호출한다고 가정하자.
 * 그리고 이 콜백함수를 인라인 함수로 제공한다고 가정해보자.
 */
function times(f, n) {
    for (let i = 0; i < n; i++) {
        f(i);
    }
}
times(n => console.log(n), 4);
let reserve = (from, toOrDestination, destination) => {
    if (toOrDestination instanceof Date && destination !== undefined) {
        return 0;
    }
    return 1;
};
function reserve2(from, to, destination) {
    // 정제
    if (to instanceof Date && destination !== undefined) {
        return 2;
    }
    else if (to instanceof String) {
        return 1;
    }
    return true;
}
let filtering = (array, f) => {
    const arr = new Array();
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (f(item)) {
            arr.push(item);
        }
    }
    return arr;
};
let names = [
    { firstname: 'a' },
    { firstname: 'b', secondname: 'c' }
];
console.log(filtering(names, (x) => {
    if (x.secondname !== undefined) {
        return true;
    }
    return false;
}));
//# sourceMappingURL=fn2.js.map