/**
 * 
 * 제네릭 타입의 한정
 * 
 * 제네릭 타입을 언제 구체 타입으로 한정하는지 결정된다.
 */

// 아래 예시를 우선 보자.
// <T>를 호출시그니처 일부로 선언했기에, Filter 타입의 함수를 실제 호출할때 구체 타입을 T로 한정한다.
type Example1 = {
    <T>(array: T[], f: (item: T) => boolean): T[];
}

let example1: Example1 = (array, f) => {
    const res = new Array();
    array.forEach(x => {
        if (f(x)) {
            res.push(x);
        }
    })
    return res;
}

let elements = [
    { firstname: 'hello' },
    { firstname: 'world', secondname: 'typescript' }
]
// Example1 타입 함수를 실제 호출할때 실제 타입을 한정한다.
// 주어진 값에 따라 T의 타입이 결정되게 된다. 
example1(elements, (x) => {
    return x !== undefined;
})

// T의 범위를 타입 별칭으로 한정하기 위해서는 해당 타입을 사용할때 타입을 명시적으로 한정하게 해야한다.
type Example2<T> = {
    (array: T[], f: (item: T) => boolean): T
}

// 이런 경우에는, Filter 사용시, 타입을 명시적으로 한정해야한다.

// let example2: Example2 = {} //'Example2' 제네릭 형식에 1 형식 인수가 필요합니다.ts(2314)

// Example2 사용과 동시에 타입을 지정한다.
let example2: Example2<number> = (arr, f) => {
    return 0;
}

type StringExampleType = Example2<string>
let example3: StringExampleType = (array, f) => {
    return "hello";
}

// T를 시그니처 범위로 한정한 이름을 갖는 함수 호출 시그니처 이다. 아래처럼 되어있는 경우, filtering3를 호출할 때 마다 T값을 가지게 된다.
function filtering3<T>(array: T[], f: (item: T) => boolean): number {
    return 0;
}

// map 함수는 매핑 함수를 이용하여 각 항목을 변환하게 된다.

function map(array: unknown[], f: (item: unknown) => unknown): unknown {
    let result = []
    for (let i = 0; i < array.length; i++) {
        result.push(f(array[i]))
    }
    return result;
}

// 이러한 경우, 매개변수 배열의 타입, 반환되는 값 타입 총 두개의 제네릭이 필요하게 된다.

function map2<T, U>(array: T[], f: (item: T) => U): U[] {
    let result = []
    for (let i = 0; i < array.length; i++) {
        result.push(f(array[i]));
    }
    return result;
}
