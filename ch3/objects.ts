/**
 * 타입스크립트의 객체타입은 객체의 형태를 정의한다
 * 
 * 타입만으로는 간단한 객체와 복잡한 객체를 구분할 수 없다
 * 
 * 자바스크립트는  구조기반 타입을 갖도록 설계되어있으며, 타입스크립트 또한 이를 따른다
 * 구조기반 타입이란, 객체가 어떤 프로퍼티를 가지고 있는지를 따지는 것이다.
 *  
 * 
 */
const test = () => {
    let a: { b: number } = {
        b: 12
    };
}

class Person {
    constructor(public firstname: string, public lastname: string) {
    }
}

const p1 = new Person("Hoplin", "Yoon")

/**
 * 만약 어떤 프로퍼티는 선택형이고, 예정에 없던 프로퍼티가 추가될 수 있다면?
 * 
 * 아래 a2는 이와 같은 의미를 가진다
 * 
 * 1. 객체의 b필드는 number 타입이다.
 * 2. string타입의 프로퍼티 c를 포함할수도 있고, 안할수도 있다
 * 3. boolean타입의 값을 갖는 number타입의 프로퍼티를 여러개 포함할 수 있다.
 * 
 */

let a2: {
    b: number
    c?: string
    [key: number]: boolean
}

a2 = { b: 1 }
a2 = { b: 2, c: "hello", 30: true, 40: true, 50: true, 60: true, 70: true, 80: true, 90: true, 100: true }
// a2 = { b: 3, 110: "string" } //110이라는 키는 number타입이지만, string타입 값을 가진다.

/**
 * 인덱스 시그니처
 * 
 * [key: T] : U와 같은 문법을 인덱스 시그니처라고 한다
 * 
 * 어떤 객체가 여러 키를 가질 수 있음을 의미한다.
 * 모든 T타입의 키는 U타입의 값을 갖는다고 해석할 수 있다.
 * 
 * 인덱스 시그니처를 사용하면 다양한 키를 객체로 추가할 수 있다.
 * 
 * 다만 키의 타입인 T에는 반드시 number, string타입에 할당 가능한 타입이어야한다.
 * 
 * 인덱스 시그니처의 키 이름은 바꿔도 된다. key가 아니어도 된다.
 * 
 */

let airplaneSeat: {
    [seatNumber: (string | number)]: (string | boolean),
} = {
    "34D": "Hoplin",
    "34E": "Hoplin2"
}

