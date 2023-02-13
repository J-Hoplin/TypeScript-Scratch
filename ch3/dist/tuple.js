"use strict";
/**
 * tuple은 배열의 서브타입이다. 길이가 고정되었고, 각 인덱스의 타입이 알려진 배열의 일종이다.
 * 튜플은 선언시 타입을 꼭 명시해주어야 한다.
 */
let t1 = [1];
let t2 = ['malcom', 'gladdwell', 1963];
// 선택형 요소도 지원한다 객체에서 사용했던 ? 를 사용한다
let fares;
fares = [
    [3.75],
    [3.75, 7.70]
];
let tests = [
    [[1, 2, 3, 'true'], 'true']
];
// fares[3] = 10; //tuple.ts:17:1 - error TS2322: Type 'number' is not assignable to type '[number, (number | undefined)?]'.
// 만약 튜플을 최소 길이를 갖도록 지정할때는 Rest 파라미터(...)를 사용할 수 있다.
// 최소 한개의 요소를 갖는 string 배열
let friends = ['Sara', 'Tail', 'Chloe', 'Claire'];
// 이형배열을 안전하게 관리할 수 있다. 순수 배열에 비해 안정성을 높일 수 있으므로 튜플 사용이 권장된다.
let list = [1, false, 'a', 'b', 'c'];
/**
 * 열거형은 해당 타입으로 사용할 수 있는 값을 열거하는 기법이다
 *
 * 키를 값에 할당하는 순서가 없는 자료구조이다.
 * - 문자열에서 문자열로 매핑
 * - 문자열에서 숫자로 매핑
 *
 * 두가지가 있다.
 * 타입스크립트는 자동으로 적절한 숫자를 추론해 할당하지만, 값을 명시적으로 할당할 수 도 있다.
*/
// 값을 명시적으로 할당하지 않으면 숫자를 추론해 할당한다.
var Langauge;
(function (Langauge) {
    Langauge[Langauge["English"] = 0] = "English";
    Langauge[Langauge["Russian"] = 1] = "Russian";
    Langauge[Langauge["Spanish"] = 2] = "Spanish";
    Langauge[Langauge["Korean"] = 3] = "Korean";
})(Langauge || (Langauge = {}));
var ImplicitLanguage;
(function (ImplicitLanguage) {
    ImplicitLanguage[ImplicitLanguage["English"] = 0] = "English";
    ImplicitLanguage[ImplicitLanguage["Korean"] = 1] = "Korean";
    ImplicitLanguage[ImplicitLanguage["Russian"] = 2] = "Russian";
})(ImplicitLanguage || (ImplicitLanguage = {}));
let test1 = Langauge.English;
let test2 = ImplicitLanguage.Korean;
console.log(`${test1} ${test2}`);
// 열거형에 문자열을 명시적으로 지정할 수 도 있다. 그리고 열거형 멤버에 명시적으로 값을 할당하는 습관을 갖자
var Color;
(function (Color) {
    Color["Red"] = "#c101010";
    Color["Blue"] = "#e54334";
    Color["Pink"] = "#we21213";
    Color[Color["White"] = 100] = "White";
})(Color || (Color = {}));
let red = Color.Red;
let blue = Color.Blue;
let white = Color[100];
console.log(`${red} ${blue} ${white} ${Color[101]}`);
//# sourceMappingURL=tuple.js.map