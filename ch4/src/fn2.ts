/**
 * 호출 시그니처
 * 
 * 함수 전체 타입을 표현하는 방법을 알아보자
 *
 * 일반적으로 아래와 같이 함서 하나가 정의되어있다면 이 함수의 타입은 `Function`이다.
 */

function sum10(a: number, b: number): number {
    return a + b;
}

/**
 * Function으로는 모든 유형의 함수를 가리킬 수 있다.
 * 그리고 이외 특정 함수와 타입 관련 정보는 알 수 없다.
 * 
 * 위 함수의 타입을 한번 정의해보면 아래와 같이 표현할 수 있다.
 * 
 * 아래 코드는 타입스크립트 함수 타입 문법으로, 호출 시그니처 혹은 타입 시그니처 라고 부른다
 * 
 * 함수 호출 시그니처는 타입 수준 코드이다.
 * 
 * 타입수준 코드란, 타입과 연산자를 포함하는 코드를 의미한다.
 * 반면 값 수준 코드란, 그 밖에 모든것을 의미한다. 단 호출시그니처는 기본값을 가질 수 없다.
 * 
 */

type sum10 = (value1: number, value2: number) => number

/**
 * 
 * @param message -> number type
 * @param userId -> number type
 * @returns -> number type
 */
let sum11: sum10 = (message, userId) => {
    return message + userId;
}

/**
 * 다른 예시로 콜백함수 f를 n번 호출한다고 가정하자. 
 * 그리고 이 콜백함수를 인라인 함수로 제공한다고 가정해보자.
 */

function times(
    f: (index: number) => void,
    n: number
): void {
    for (let i = 0; i < n; i++) {
        f(i);
    }
}

times(n => console.log(n), 4);

/**
 * 위에서 봤던 형태는 단축형 호출 시그니처이다
 * 
 * (parameter types) => return type
 * 
 * 이 호출 시그니처를 조금 더 명확히 표현하기 위해 아래와 같이 표현할 수 있다
 * 
 * (parameter types): return type
 */

// 위의 sum10과 동일한 의미이다.
type sum11 = {
    (value1: number, value2: number): void
}

// 간단한 상황에서는 단축형을 주로 활용하되, 복잡한 함수인 경우에는 전체 시그니처를 활용해야한다.
// 예를 들어 함수 타입의 오버로딩을 예로 들 수 있다.


type Reserve = {
    (from: Date, to: Date, destination: string): number,
    (from: Date, destination: string): number
}

let reserve: Reserve = (from: Date, toOrDestination: Date | string, destination?: string): number => {
    if (toOrDestination instanceof Date && destination !== undefined) {
        return 0;
    }
    return 1;
}

// 아래와 같은 형태로 오버로드 함수 호출을 기재할 수 있다
function reserve2(from: Date, to: Date, destination: string): number;
function reserve2(from: Date, destination: string): boolean

function reserve2(from: Date, to: Date | string, destination?: string): number | boolean {
    // 정제
    if (to instanceof Date && destination !== undefined) {
        return 2;
    } else if (to instanceof String) {
        return 1;
    }
    return true;
}

/**
 * 지금껏 봤던 모든 타입은, 구체타입이다.
 * 
 * 기대하는 타입을 알 고 있으며, 실제로 해당 타입이 전달되었는지 확인할때 유용하다.
 * 
 * 반대로 어떤 타입을 사용할지 미리 알 수 없는 경우 또한 있다
 */



// 만약 여기서 객체 배열을 넣어야 한다면 그것도 나름대로 문제다
// object는 순수히 객체임만을 밝힐 뿐, 그 안에 프로퍼티를 사용하기 위해서는 따로 적어주어야 한다.
type Filter = {
    (arr: number[], f: (i: number) => boolean): number[]
    (arr: string[], f: (i: string) => boolean): string[]
    (arr: object[], f: (i: object) => boolean): object[]
}

// 코드가 매우 지저분해질 염려가 있다.
// 이를 방지하고자 제네릭 타입을 도입하였다.
// 아래와 같이 쓰게 되면, 전달된 객체의 타입을 보고 판단하게 된다.
type Filter2 = {
    <T>(arr: T[], f: (item: T) => boolean): T[]
}

let filtering: Filter2 = (array, f) => {
    const arr = new Array();
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (f(item)) {
            arr.push(item)
        }
    }
    return arr;
}

let names = [
    { firstname: 'a' },
    { firstname: 'b', secondname: 'c' }
]

console.log(filtering(names, (x) => {
    if (x.secondname !== undefined) {
        return true;
    }
    return false;
}))
