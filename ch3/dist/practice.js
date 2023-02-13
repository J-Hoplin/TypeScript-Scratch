"use strict";
function squareOf(n) {
    return n * n;
}
squareOf(2);
// squareOf('2'); Error
// any : 되도록 사용하지 말것
/**
 * 타입스크립트는 any로 추정되는 값을 만나면
 * 예외를 발생시키지 않는다.
 *
 * 하지만 암묵적인 any가 나타났을때 예외를 발생시키는 방법은 tsconfig에
 *
 * noImplicitAny 플래그를 활성화
 * strict 활성화
 *
 * 두가지 방법중 하나를 사용하면 된다.
 */
let a = 100;
let b = ['any type'];
let c = a + b;
/**
 * unknown
 *
 * 타입을 미리 알수 없는 경우, any 대신 unknown을 쓸것
 *
 * 정제되기 전까지 타입스크립트가 사용을 막는다.
 *
 */
let d = 30;
let e = a === d;
// let f = d + 30; // d가 unknown이라 사용불가
// 타입 정제
if (typeof d === 'number') {
    let f = d + 30;
}
// boolean
// 타입리터럴 형태로 지정 가능하다(오직 하나의 값만 가지는경우 의미)
let g = true;
let h = false;
let i = true;
let j = [true, false];
// number : 모든 숫자타입(정수, 실수, 소수, 양수, 음수, Infinity, NaN등 가능). 숫자 관련 연산을 수행할 수 있다.
let k = 10;
let l = Infinity;
let m = NaN;
let n = 26.218;
// bigint : number와 동일하게, 숫자 관련 연산을 지원한다
// 단 bigint는 지원하지 않는 플랫폼이 있으므로, 확인해야한다. 
// bigint는 뒤에 n을 붙이거나 Bigint() 생성자를 통해 생성한다
// BigInt literals are not available when targeting lower than ES2020
let o = 1234n;
// let p: bigint = 88.5; // Error, 이 리터럴은 float로 평가된다.
// let p: bigint = 88.5n; // Bigint 리터럴은 정수타입이어야 한다
let p = 88n;
// string : 모든 문자열의 집합으로, 연결 및 슬라이스 등의 연산을 모두 수행할 수 있다.
let q = "hello";
let r = "world";
let s = q + r;
// let t: "john" = "zoe";  // Error 특정 값을 지정하는 리터럴 방식이지만, 값이 다르다
//# sourceMappingURL=practice.js.map