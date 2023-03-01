/**
 * 클래스는 인터페이스를 통해 사용할때가 많다.
 * 
 * 앞에서 본 타입별칭처럼, 인터페이스도 타입에 이름을 지어주는 수단이다.
 * 인터페이스를 사용하면 더 깔끔하게 타입을 정의할 수 있다.
 * 
 * 
 */

// 타입 별칭
type Sushi = {
    calories: number,
    salty: boolean,
    tasty: boolean
}

// 위 타입 별칭을 인터페이스로 바꿔보면
interface SushiInteface {
    calories: number;
    salty: boolean;
    tasty: boolean;
}

/**
 * 
 * 타입 별칭 방식으로 공통정보를 정의한다고 가정한다
 */

type Food = {
    calories: number,
    tasty: boolean
}

type Sushi2 = Food & {
    salty: boolean
}

type Cake = Food & {
    sweeet: boolean
}

// Sushi와 Cake는 모두 공통적으로 칼로리와 맛의 여부를 가지고 있기에 묶는다.

// 위 공통정보를 인터페이스를 통해서 정의한다고 가정하자.
interface Food2 {
    calories: number
}

interface Sushi3 extends Food {
    salty: boolean
}

interface Cake2 extends Food {
    sweet: boolean
}

/**
 * 타입 별칭 vs 인터페이스
 * 
 * 
 * 첫번째로 타입 별칭의 오른편에는 타입 표현식(|,&포함)을 포함한 모든 타입이 등장할 수 있다.
 * 
 * 예를 들어 아래와 같은 타입은 인터페이스로 작성이 불가능하다
 */

type A = number;
type B = A | string;

/**
 * 인터페이스를 상속할때 타입스크립트는 상속받는 인터페이스의 타입에 
 * 상위 인터페이스를 할당할 수 있는지 확인한다.
 */

interface A1 {
    good(x: string): string
    bad(x: number): string
}

interface A2 extends A1 {
    good(x: string | number): string
    // bad(x: string): string // 인터페이스를 잘못 확장하였다는 오류가 나온다.
}

// 만약 타입 별칭방식인 경우에는 인터섹션(&)으로 바꿔서 표현하며, 최대한 조합하는 방향으로 동작하게 된다.
/**
 * type B2 = B1 & {
    (x: string | number): string;
    (x: string): string;
}
 */
type B1 = {
    (x: string): string,
    (x: number): string
}
type B2 = B1 & {
    (x: string | number): string
    (x: string): string
}

/**
 * 세번째로 이름과 범위가 같은 인터페이스가 여러개 있는경우 이들이 자동으로 합쳐진다.(같은 조건에서 타입 별칭이 여러개인 경우에는 컴파일 에러가 난다.)
 * 이를 선언 합침이라고 부른다.
 * 
 * 예를 들어 User라는 동일한 이름의 인터페이스가 두개 있다면, 타입스크립트는 둘을 하나의 인터페이스로 합친다.
 */
interface User {
    name: string
}

interface User {
    age: number
}

// user1은 User타입 충족을 위해서 name,age를 가져야한다.
let user1: User = {
    name: 'Name',
    age: 25
};

/***
 * 이를 타입 별칭으로 표현하면 아래와 같다
 * 하지만 이는 타입 별칭으로 표현하면 오류로 나오는것을 볼 수 있다.
 * 
 * 즉 타입 별칭 방식은, 선언합침이 안된다.
 */

type User2 = {
    name: string
}

// 식별자 중복 오류
// type User2 = {
//     age: number
// }

/**
 * 인터페이스끼리 충돌해서는 안된다.
 * 
 * 동일한 이름의 인터페이스가 동일한 이름의 프로퍼티를 가지고 있는 경우, 서로 다른 타입을 가리키고 있다면, 오류가 발생한다
 */

interface User3 {
    age: number
}

// OK
interface User3 {
    age: number
}

interface User4 {
    age: number
}

// Not OK
// interface User4 {
//     age: string
// }

/**
 * 인터페이스에 제네릭을 설정하는경우에는 제네릭의 선언 방법, 이름까지 모두 동일해야한다.
 * 
 */

interface User5<T extends number> {
    age: T
}

interface User5<T extends number> {
    age: T
}

/**
 * 클래스 선언시, implements라는 키워드를 이용하여 특정 인터페이스를 만족시킬 수 있다.
 * 
 * 인터페이스에서 제시한 메소드는 모두 구현해야한다. 당연히, 필요에 따라 추가적인 메소드나 프로퍼티를 추가할 수 있다.
 * 
 * 인터페이스에 의해 추가된 프로퍼티는 무조건 public이며, protected, private접근제어자를 가질 수 없다., static 키워드 또한 사용할 수 없다.
 * 인스턴스 프로퍼티를 readonly로 설정할 수 도 있다.
 * 
 * 또한 하나의 클래스는 여러개의 인터페이스를 구현할 수 있다(java와 동일)
 */

interface Animal {
    readonly name: string
    eat(food: string): void
    sleep(hour: number): void
}

interface Feline {
    meow(): void
}

class Cat implements Animal, Feline {
    meow(): void {
        console.log("meow")
    }
    eat(food: string): void {
        console.log(`Eat ${food}`)
    }
    sleep(hour: number): void {
        console.log(`Sleep ${hour} hour`)
    }
    name: string = 'MyCat';
}

class CatUpper extends Cat {
    constructor() {
        super();
        console.log(this.name)
    }
}


const cp = new CatUpper();