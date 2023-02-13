/**
 * 타입스크립트 배열또한 concat, push, search, slice등을 지원하는 특별한 객체이다
 * 
 */
let arr = [1, 2, 3]; // number[]
let arr2 = ['a', 'b'] // string[]
let arr3: string[] = ["string"]
let arr4 = [1, 'a'] // (string | number)[]

let arr5 = ['red'] // string[]

arr5.push('blue')
//arr5.push(true) //  error TS2345: Argument of type 'boolean' is not assignable to parameter of type 'string'.


// 배열은 가능하면 동형으로 만드는것이 좋다. 즉 모든 항목이 동일한 타입을 갖도록 하는것이다.
// 타입스크립트는 초기화를 하면서, 배열에 인자가 있다면, 해당 인자들을 가지고 배열의 타입을 추론한다.

//만약 빈 배열이라면 타입스크립트는 any[]로 추정하고, 배열을 조작하면서, 요소를 추가하면 주어진 정보들로 타입을 추론한다
// 정의된 영역(ex : 함수영역 등)을 벗어나면,빈배열이었던 배열을 확장할 수 없도록 최종타입을 할당한다.

function buildArrat() {
    let a = [] // any[]
    a.push(1); // number[]
    a.push('x'); // (string | number)[]
    return a
}
const arr6 = buildArrat();
// arr6.push(true) // arr.ts:29:11 - error TS2345: Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
