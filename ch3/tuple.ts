/**
 * tuple은 배열의 서브타입이다. 길이가 고정되었고, 각 인덱스의 타입이 알려진 배열의 일종이다.
 * 튜플은 선언시 타입을 꼭 명시해주어야 한다.
 */

let t1: [number] = [1];
let t2: [string, string, number] = ['malcom', 'gladdwell', 1963]

// 선택형 요소도 지원한다 객체에서 사용했던 ? 를 사용한다

let fares: [number, number?][];
fares = [
    [3.75],
    [3.75, 7.70]
]

let tests: ((number | string)[] | string)[][] = [
    [[1, 2, 3, 'true'], 'true']
]

// fares[3] = 10; //tuple.ts:17:1 - error TS2322: Type 'number' is not assignable to type '[number, (number | undefined)?]'.

// 만약 튜플을 최소 길이를 갖도록 지정할때는 Rest 파라미터(...)를 사용할 수 있다.


// 최소 한개의 요소를 갖는 string 배열
let friends: [string, ...string[]] = ['Sara', 'Tail', 'Chloe', 'Claire']
// 이형배열을 안전하게 관리할 수 있다. 순수 배열에 비해 안정성을 높일 수 있으므로 튜플 사용이 권장된다.
let list: [number, boolean, ...string[]] = [1, false, 'a', 'b', 'c']

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
enum Langauge {
    English,
    Russian,
    Spanish,
    Korean
}

enum ImplicitLanguage {
    English = 0,
    Korean = 1,
    Russian = 2
}

let test1: number = Langauge.English;
let test2: number = ImplicitLanguage.Korean;
console.log(`${test1} ${test2}`);

// 열거형에 문자열을 명시적으로 지정할 수 도 있다. 그리고 열거형 멤버에 명시적으로 값을 할당하는 습관을 갖자

enum Color {
    Red = "#c101010",
    Blue = "#e54334",
    Pink = "#we21213",
    White = 100
}

// 타입스크립트는 값이나 키로 열거형에 접근할 수 있도록 허용한다
let red: string = Color.Red;
let blue: string = Color.Blue;

// 이러한것을 역방향 찾기라고 한다.
let white: string = Color[100]

console.log(`${red} ${blue} ${white} ${Color[101]}`)
// 문제는 위에서 Color[101]과 같이 접근이 허용되서는 안되는것도 허용이 된다
// 이러한 것은 const enum을 사용하면 막을 수 있다.

const enum Langauge2 {
    English,
    Spanish,
    Korean,
    Russian
}

let e1 = Langauge2.English;
let e2 = Langauge2.Spanish;
let e3 = Langauge2.Korean;
// let e4 = Langauge2[0];//const 열거형 멤버는 문자열 리터럴을 통해서만 액세스할 수 있습니다
// Enum형은 최대한 피하는것이 좋다.  

// 숫자형 enum타입
const enum Flippable {
    Burger,
    Chair,
    Cup,
    Skateboard,
    Table
}

function flip(f: Flippable): string {
    return "Flipped"
}

flip(Flippable.Burger);
flip(Flippable.Chair);
flip(12);

// 12는 들어가면 안되지만, 할당이 가능하다. 이는 문자열값을 갖는 열거형을 사용해 해결한다
const enum Flippable2 {
    Burger = "burger",
    Chair = "chair",
    Cup = "cup",
    Skateboard = "skateboard",
    Table = "table"
}

function flip2(f: Flippable2): string {
    return "flipped"
}