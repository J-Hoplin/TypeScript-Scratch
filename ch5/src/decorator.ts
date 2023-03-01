function first() {
    console.log("first() : Evaluated")
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("first() called")
    }
}

function second() {
    console.log("Second() : Evaluated")
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("second() called")
    }
}

/**
 * 각 데코레이터의 표현은 위에서 아래로 평가된다
 * 
 * 그 후 결과는 아래에서 위로 함수로 호출된다.
 */

class ExampleClass {
    @first()
    @second()
    method() {
        console.log("Method called")
    }
}

const qw = new ExampleClass();
qw.method()
/**
 * 
first() : Evaluated
Second() : Evaluated
second() called
first() called
Method called
 */

/**
 * 클래스 데코레이터
 * 
 * 클래스 선언 직전에 선언된다. 클래스 생성자에 적용되고, 클래스 정의를 관찰, 수정 또는 교체하는데 사용할 수 있다
 * 새로운 메소드를 추가하지는 못한다.
 * 
 * 데코레이팅된 클래스 생성자를 유일한 인수로 호출한다.
 */

type PayLoad = {
    payload: string
}

interface payloadDefault {
    getValue(): PayLoad
}


type ClassConstructor2<T> = new (...args: any[]) => T;

function Serializable<T extends ClassConstructor2<payloadDefault>>(Constructor: T) {
    console.log(new Constructor)
    return class extends Constructor {
        example = "Override"
        /**
         * 
         * getValue()를 구현하고 있는 클래스에 대해서만 가능하다. 
         * 
         */
        serializable() {
            console.log(this.getValue())
            return this.getValue().payload
        }

        getValue(): PayLoad {
            console.log(Object.getOwnPropertyDescriptors(this.example))
            return {
                payload: "Overrided payload"
            }
        }
    }
}

@Serializable
class APIPayload {
    public example: string
    constructor(m: string) {
        this.example = m;
    }
    getValue() {
        const test: PayLoad = {
            payload: "hello"
        }
        return test;
    }
}

const ap = new APIPayload("Hello")
console.log(ap.example);
console.log(ap.getValue());

/**
 * 
 * 메소드 데코레이터
 * 
 * 메소드 데코레이터의 경우, 메소드 선언 직전에 선언된다. 
 * 
 * 메소드 관찬 수정, 대체에 사용할 수 있다. 메소드 데코레이터가 가장 많이 이용된다.
 * 
 * 클래스 데코레이터는 클래스의 생성자를 extends 하는 방식이었지만, 메소드 데코레이터는 Property Descriptor를 수정하여 메소드를 확장한다.
 * 
 * 메소드 데코레이터는 3가지 인자를 받는다.
 * 
 * 1. static 프로퍼티라면, 클래스의 생성자 함수, 인스턴스 프로퍼티라면 클래스의 prototype 객체
 * 2. method 이름
 * 3. method의 property descriptor
 * 
 * 메소드의 프로퍼티 디스크립터 종류는 아래와 같다.
 * 
 * value : 현재의 값
 * writable : 수정 가능하면 true, 아니면 false
 * enumerable : 순회 가능의 여부
 * configurable : Property definition에 대해 수정 및 삭제가 가능한지
 */

function methodDecorator() {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;

        // value는 함수 그 자체를 가리킨다
        // value 프로퍼티를 변경하여, 함수 자체를 변경
        descriptor.value = () => {
            // 변경 이전 함수
            originalMethod()
            // 변경 이후 함수
            console.log("Changed!!")
        }
    }
}

class Test {
    @methodDecorator()
    test() {
        console.log("Not changed")
    }
}

const tt2 = new Test();
tt2.test();

/**
 * 프로퍼티 데코레이터는 프로퍼티 선언 바로 전에 선언된다.
 * 
 *  프로퍼티 데코레이터의 표현식은 아래 두개의 인수가 필요하다. 메소드 데코레이터와 달리, 프로퍼티 디스크립터를 받지 않는다.
 * 
 * 1. 정적 멤버에 대한 클래스 생성자 함수 혹은 인스턴스 멤버에 대한 클래스의 프로토 타입
 * 2. 멤버 이름
 * 
 * 반환타입은 두가지가 될 수 있다.
 * 
 * 1. Property Descriptor
 * 2. void
 * 
 * 리턴값으로 Object.defineProperty()를 반환함으로서, 속성의 부가적인 설정을 할 수 있다.
 * 
 */

// Return Type이 Property Descriptor인 경우

function writable(writable: boolean) {
    return function (target: any, propertyName: string): any {
        return {
            writable
        }
    }
}

class PropDeco {
    @writable(false)
    public data1 = 0;

    @writable(true)
    public data2 = 1;
}

const pd = new PropDeco();
//TypeError: Cannot assign to read only property 'data1' of object '#<PropDeco>'
pd.data1 = 10;
pd.data2 = 20;