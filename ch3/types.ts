/**
 * 타입 별칭
 * 
 * 타입별칭으로 타입을 지정할 수 있다.
 */

type Age = number;
type PersonType = {
    name: string
    age: Age
    [key: string]: string | Age
}

let age: Age = 55;
let driver: PersonType = {
    name: "hoplin",
    age
}

// 하나의 타입을 두번 정의할 수 없다
// type Age = string; // 식별자 중복

// 유니온과 인터섹션 타입
/**
 * Union -> 합집합
 * 
 * Intersection -> 교집합
 * 
 * 타입스크립트는 타입에 적용할 수 있는 특별한 연산자인 union ( | ) 과 intersection ( & )를 제공한다.
 * 
 * 
 */

type Cat = { name: string, purrs: boolean }
type Dog = { name: string, barks: boolean, wags: boolean }

// Cat에만 속할 수 도, Dog에만 속할 수 도 혹은 둘다 속할 수 있다.
type CatOrDogOrBoth = Cat | Dog;
// Cat,Dog 두가지 속성 모두 있어야한다.
type CatAndDog = Cat & Dog;


let a4: CatOrDogOrBoth;
// Cat type
a4 = {
    name: 'Bonkers',
    purrs: true
}
// Dog type
a4 = {
    name: 'Domino',
    barks: true,
    wags: true
}
// Dog and Cat type
a4 = {
    name: 'Donkers',
    purrs: true,
    barks: true,
    wags: true
}

// Union Type : 두가지 타입을 모두 만족해 주어야 한다

let a5: CatAndDog;
// a5 = {
//     name: 'Bonkers',
//     purrs: true
// } // Error, Dogs의 성질들이 없습니다

a5 = {
    name: 'Donkers',
    purrs: true,
    barks: true,
    wags: true
}
// Intersection Type: 두가지 타입을 모두 만족해 주어야 한다.
// 주로 Union 타입을 많이 사용한다.


// 아래 함수는 만약 참이면 문자열을 거짓이면 boolean을 반환한다
// 유니온을 사용해 타입을 아래와 같이 정의해 사용할 수 있다.
type trueOrNullReturn = string | boolean;
function trueOrNull(isTrue: boolean): trueOrNullReturn {
    if (isTrue) {
        return 'true'
    }
    return false
}


let h1 = null;
const g1 = [3];