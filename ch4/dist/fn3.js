"use strict";
/**
 *
 * 제네릭 타입의 한정
 *
 * 제네릭 타입을 언제 구체 타입으로 한정하는지 결정된다.
 */
let example1 = (array, f) => {
    const res = new Array();
    array.forEach(x => {
        if (f(x)) {
            res.push(x);
        }
    });
    return res;
};
let elements = [
    { firstname: 'hello' },
    { firstname: 'world', secondname: 'typescript' }
];
// Example1 타입 함수를 실제 호출할때 실제 타입을 한정한다.
// 주어진 값에 따라 T의 타입이 결정되게 된다. 
example1(elements, (x) => {
    return x !== undefined;
});
// 이런 경우에는, Filter 사용시, 타입을 명시적으로 한정해야한다.
// let example2: Example2 = {} //'Example2' 제네릭 형식에 1 형식 인수가 필요합니다.ts(2314)
// Example2 사용과 동시에 타입을 지정한다.
let example2 = (arr, f) => {
    return 0;
};
let example3 = (array, f) => {
    return "hello";
};
// T를 시그니처 범위로 한정한 이름을 갖는 함수 호출 시그니처 이다. 아래처럼 되어있는 경우, filtering3를 호출할 때 마다 T값을 가지게 된다.
function filtering3(array, f) {
    return 0;
}
// map 함수는 매핑 함수를 이용하여 각 항목을 변환하게 된다.
function map(array, f) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(f(array[i]));
    }
    return result;
}
// 이러한 경우, 매개변수 배열의 타입, 반환되는 값 타입 총 두개의 제네릭이 필요하게 된다.
function map2(array, f) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(f(array[i]));
    }
    return result;
}
let t1 = {
    value: 'a'
};
let t2 = {
    value: 'b',
    isLeaf: true,
};
let t3 = {
    value: 'c',
    children: [t1, t2]
};
function mapNode(node, f) {
    return Object.assign(Object.assign({}, node), { value: f(node.value) });
}
let tn = {
    value: 'a'
};
mapNode(tn, x => x);
// 여기서 T대신 Shape 사용
function logPermiter(s) {
    console.log(s.numberOfSides * s.sideLength);
    return s;
}
let square = {
    numberOfSides: 10,
    sideLength: 20
};
logPermiter(square);
/**
 * 가변 인수 함수에서도 한정된 다형성을 사용할 수 있다
 *
 */
const fill = (length, value) => {
    return Array.from({
        length
    }, () => value);
};
function call(f, ...args) {
    console.log(args);
    return f(...args);
}
call(fill, 10, 30);
let reserve3 = (fromOrDestination, toOrDestinatoin, destination) => {
    let t = {
        value: 'test'
    };
    return t;
};
const a10 = "pl";
let reserve4 = () => {
    return "hi";
};
// excersice4
// 튜플 이항배열 최소 길이 보장 성질 활용
function call2(f, ...args) {
}
//excersice5
const is = (value1, ...value2) => {
    return;
};
is([10], [12, 3, 4], [5, 6, 7, 8]);
//# sourceMappingURL=fn3.js.map