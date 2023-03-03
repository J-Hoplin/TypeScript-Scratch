class Animal { }
class Bird extends Animal {
    public chrip(): void {

    }
}
class Crow extends Bird {
    public caw() {

    }
}

function chirp(bird: Bird) {

}

type BirdCallback = (bird: Bird) => Bird


function clone(cb: BirdCallback) {
    let parent = new Bird()
    let baby = cb(parent)
    baby.chrip()
}

function BirdToAnimal(bird: Bird): Animal {
    return new Animal();
}

function BirdToCrow(bird: Bird): Crow {
    return new Crow();
}

/**
 * TS2345: Argument of type '(bird: Bird) => typeof Animal' is not assignable to parameter of type 'BirdCallback'.
  Property 'chrip' is missing in type 'typeof Animal' but required in type 'Bird'.
 *
 */
// clone(BirdToAnimal)


clone(BirdToCrow)

/**
 * 초과 프로퍼티
 * 
 * 타입 스크립트같은 경우에는 본타입 T에 U를 넣는다고 가정하자.
 * 
 * 만약 U가 T에 존재하지 않는 타입의 프로퍼티를 가지고 있다면, 에러로 처리를 한다.
 * 
 */

type Options = {
    baseURL: string
    cacheSize?: number
    tier?: 'dev' | 'prod'
}

class API {
    constructor(private options: Options) {

    }
}

new API({
    baseURL: 'url',
    tier: 'prod'
})


/**
 * 오류가 난다.
 *
 */
// new API({
//     baseURL: 'url',
//     tierr: 'prod'
// })

// 타입스크립트는 프로퍼티 확인이라는 기능이 있다. 만약 존재하지 않는프로퍼티를 할당하면 오류가 난다.

// as T 문법을 이용해서 as assertion을 통해서 초과 프로퍼티 검사 수행을 수행하지 않을 수 있다.

new API({
    baseURL: 'url',
    tierr: 'prod'
} as Options)

// Key-In 연산자
type APIResponse = {
    user: {
        userId: string
        friendList: {
            count: number
            friends: {
                firstName: string
                lastName: string
            }[]
        }
    }
}

/**
 * 
 * 만약 APIResponse 에서 friendList 필드의 Value를 하나의 타입으로 정의한다고 가정하면 아래와 같이 나눠질 것이다
 * 
 */

type FriendList = {
    count: number
    friends: {
        firstname: string
        lastname: string
    }
}

// APIResponse를 FriendList타입을 사용하여 완성하면 아래와 같이 설정할 수 있다.
type APIResponse2 = {
    user: {
        userId: string
        friendList: FriendList
    }
}

// 하지만 이러한 방식은 최상위 타입에서 쓰이는 필드들을 하나씩 정의해 주어야 한다.
// 대신 Key-In 방식을 사용하는것도 방법이다.
// 선택지정 연산자(.) 대신 대괄호 접근 방식으로 필드 접근을 하여 타입을 선택한다.
type FriendList2 = APIResponse['user']['friendList']

/**
 * keyof연산자
 * 
 * keyof연산자를 이용하면, 객체의 모든 키들에 대해서 문자열 리터럴 타입을 유니온으로 얻을 수 있음.
 * 
 */

type APIResKeys = keyof APIResponse; // 'user'

type p = keyof FriendList // 'count' | 'friends'

const a1: p = 'count'

type p2 = FriendList[p] // FriendLists에서 p를 찾을때 의미한다. p가 'count'라면 number 타입으로, 'friends'라면 
/**
 * 
 * number | {
        firstname: string
        lastname: string
    }

    타입으로 된다.
 */

type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
type Day = Weekday | 'Sat' | 'Sun'


/**
 * Record타입 -> 매핑하는 용도이다.
 * 
 * 객체가 특정 키 집합을 정의하도록 강제하는 방법중 하나이다.
 * 
 * Record<Keys, Types> 형태이다.
 * 
 * Keys -> 키들의 타입이다
 * 
 * Types -> 값들의 타입이다.
 * 
 */

let nextDay: Record<Weekday, Day> = {
    Mon: 'Tue',
    Tue: 'Wed',
    Wed: 'Thu',
    Thu: 'Fri',
    Fri: 'Sat'
}

/**
 * 매핑된 타입
 * 
 * 매핑된 타입을 이용하여 nextDay가 Weekday를 키로, Day를 값으로 갖는 객체로 선언
 * 
 */

type nextDayType = { [K in Weekday]: Day }
let nextDay2: nextDayType = {
    Mon: "Mon",
    Tue: "Mon",
    Wed: "Mon",
    Thu: "Mon",
    Fri: "Mon"
}

/**
 * 매핑된 타입 문법은 위에서 본 Record를 구현하는데 쓰이기도 한다.
 * 
 */

type t1 = keyof any // string | number | symbol -> 객체의 키 값이 될 수 있는것은 이 세가지만 가능하므로

// 매핑된 타입을 가지고 Record 구현하기

type RecordMock<K extends keyof any, T> = {
    [V in K]: T
}

/**
 * 내장된 매핑된 타입
 * 
 * 타입스크립트는 다양한 내장 매핑 타입이 존재한다.
 * 
 * Partial<typeof Object> : Object의 모든 필드를 선택형으로 표시
 * 
 * Required<typeof Object> : Object의 모든 필드를 필수로 표시
 * 
 * Readonly<typeof Object> : Object의 모든 필드를 읽기 전용으로 표시
 */

let testobj = {
    test1: 10,
    test2: 20,
    test3: 'string30'
}

// Object의 필드들을 일부만 구현해도됨
type PartialTest = Partial<typeof testobj>;

let partialObject: PartialTest = {
    test1: 10,
    test2: 20
}

// Object의 모든 필드 구현해야함
type RequiredTest = Required<typeof testobj>

let requiredObject: RequiredTest = {
    test1: 0,
    test2: 0,
    test3: ""
}

/**
 * 타입과 값 네임스페이스가 따로 있다는 점을 이용하였다
 * 
 * 
 * 동일한 이름이지만, 하나의 이름으로 값, 타입 모두 정의할 수 있다.
 * 
 */

import { Currency } from './companion'

let amount: Currency = {
    unit: 'EUR',
    value: 100
}

console.log(Currency.from(100, 'EUR'))


/**
 * 
 * 조건부 타입
 * 
 * 조건부 타입은 일반적인 삼항 연산자처럼 생겼다.
 * 
 */

type IsString<T> = T extends string ? true : false

type testi1 = IsString<string>
type testi2 = IsString<number>


