"use strict";
/**
 * 대표적인 TypeScript의 Type종류
 *
 * 1. Boolean
 * 2. number : 연산과 숫자 호출에 사용할 수있는 모든 메소드까지 포함
 * 3. string : 문자열과 문자열 호출에 사용할 수 있는 모든 메소드까지 포함
 *
 */
function square(n) {
    return n * n;
}
square(4);
/**
 * any : 모든 타입을 커버하는 타입이다. any는 필요한 상황이 아니면 사용하지 않는것이 좋다.
 *
 * 개발자와 tsc모두 타입을 알 수 없는경우 any를 기본타입으로 가정하지만, 이는 typescript사용의 이유를 없앤다.
 *
 * tsconfig에 noImplicitAny를 사용하면, 암묵적으로 any가 나타났을때 예외를 일으킨다. tsconfig.json에 noImplicitAny를 활성화하면 된다.
 * 만약 strict를 true로 했다면 할 필요 없다.
 *
 */
const a = "hi";
square(a); // square함수에 number라고 타입 명시를 해주었지만, any로 하였기에 tsc가 오류로 판별하지 않는다.
/**
 * unknown : any와 동일하기 타입을 알 수 없는 값에 대해서 사용한다.
 *
 * 하지만 any와 차이점이라면, unknown타입은 타입 정제가 이루어지기 전까지는 unknown타입을 타입스크립트가 사용하지 못하게 강제된다.
 * 그렇기 때문에, 타입을 알 수 없는 상황에서는 가급적 unknown을 사용한다.
 *
 * unknown타입은 비교연산과 반전연산(!)을 지원하며, typeof, instanceof연산자로 정제를 해줄 수 있다.
 */
let d = 30;
let e = d === 123;
//let f = d + 10 // Type is Unknown
// 아래와 같이 typeof연산자로 정제를 해줄 수 있다.
if (typeof d === 'number') {
    let f = d + 10;
}
/**
 * boolean :  true or false
 *
 */
let f = true;
// boolean타입은 특정 boolean 타입임을 명시해줄 수 있다.
let g = true;
// number : 일반적인 정수형태 자료형이다.
let n1 = 1000;
let n2 = 2000;
// number자료형 또한 특정 number형만 올 수 있도록 지정할 수 있다.
//let n3:3000 = 4000 // 할당할 수없음
let n4 = 30.90;
// bigint : number의 상위호환 타입이다. number는 2^53까지 정수를 표현할 수 있지만, bigint를 사용하면 더 큰 수도 표현할 수 있다.
// bigint는 반드시 정수형이어야 하며 뒤에 n이 붙는다. bigint같은 경우에는 ES2020미만에 대해서는 사용할 수 없다.
let h = 100n;
// bigint또한 특정 bigint만 올 수 있도록 지정해 줄 수 있다.
let h2 = 200n;
//h2 = 300n // 300n형식은 200n에 할당할 수 없음.
// string : 모든 문자열의 집합으로 연결, 슬라이스 등의 연산을 수행할 수있다.
let i = "hello";
const j = "world";
// string또한 특정 string만 들어올 수 있도록 지정해줄 수 있다.
//const k:"hoplin" = "hoplin_" // 할당 불가능
// object 타입 : 객체의 형태를 정의한다. 객체 타입만으로 간단한 객체와 복잡한 객체를 구분할 수없다.
let obj = {
    b: "x"
};
//obj.b // 이는 오류가 발생한다. obj에 b라는 속성이 없다는 문구가 나온다.
// object는 서술한 값에 관한 정보를 주지 않고, 단지 값이 js object라는 것만 알려준다.
// 자바스크립트 객체에 대한 타입 서술을 위해서는 tsc가 타입을 추론하게 하거나(일반적인 자바스크립트 작성하듯이), 아래와 같이 타입 명시를 통해 진행해 주어야 한다.
// TSC가 추론하도록 하기
let obj_a = {
    a: "example string",
    b: 30
};
// 타입 명시
let obj2 = {
    b: 102
};
console.log(obj2.b);
let obj3 = {
    a: 102,
    b: "example",
    c: {
        c1: true
    }
};
console.log(`${obj3.a} ${obj3.b}`);
console.log(obj3.c.c1);
let obj4 = {
    firstname: "Andrew",
    lastname: "Hoplin",
    age: 24
};
let obj5 = {
    firstname: "john",
    lastname: 'barrowman'
};
class Person {
    // public은 this.firstname을 축약한 것이다.
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }
}
let obj_p = new Person("matt", "smith");
// 확실한 할당 : 위와 같이 {타입 지정}-{초기화} 형태로 하게 된다.
// 변수를 선언하고 나중에 초기화 하는 상황에서 타입스크립트는 변수를 사용하기 전에 값을 강제로 할당하도록 한다
let ex1;
//let jp = ex1 * 10 // 할당되기 전에 사용됨 오류
//타입 스크립트는 객체 프로퍼티에 엄격한 편이다. 만약 정의한 프로퍼티가 없다면 오류가 나고, 정의되지 않은 프로퍼티가 추가되면 오류가 발생한다.
// 특정 프로퍼티는 선택형이고, 없던 프로퍼티가 추가될것이라는 것을 타입스크립트에 알려줄 수 있다.
let ex2;
/**
 * 위와 같이 타입을 지정하면 아래와 같은 의미로 해석된다
 *
 * number타입의 프로퍼티 a를 포함한다
 * string타입의 프로퍼티 c를 포함할 수 있다
 * boolean을 value로 가지고, key가 number 타입인 프로퍼티를 여러개 포함할 수 있다.
 * string을 key로 하고 any타입을 가지는 프로퍼티 여러개를 포함할 수 있다.
 */
ex2 = {
    a: 100,
    c: "string of property 'C'",
    hello: true,
    example: 200,
    example2: 'string'
};
// 타입 지정시 readonly한정자를 사용해서 특정 필드를 읽기 전용으로 정의할 수 있다. 약간 프로퍼티에 const를 적용한 효과를 만든다
let user = {
    firstName: "hello world"
};
console.log(user.firstName);
//user.firstName = "restore firstname" // 읽기 전용 속성이므로 변경 불가
//# sourceMappingURL=index.js.map