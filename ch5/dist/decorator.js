"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function first() {
    console.log("first() : Evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("first() called");
    };
}
function second() {
    console.log("Second() : Evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("second() called");
    };
}
/**
 * 각 데코레이터의 표현은 위에서 아래로 평가된다
 *
 * 그 후 결과는 아래에서 위로 함수로 호출된다.
 */
class ExampleClass {
    method() {
        console.log("Method called");
    }
}
__decorate([
    first(),
    second()
], ExampleClass.prototype, "method", null);
const qw = new ExampleClass();
qw.method();
function Serializable(Constructor) {
    console.log(new Constructor);
    return class extends Constructor {
        constructor() {
            super(...arguments);
            this.example = "Override";
        }
        /**
         *
         * getValue()를 구현하고 있는 클래스에 대해서만 가능하다.
         *
         */
        serializable() {
            console.log(this.getValue());
            return this.getValue().payload;
        }
        getValue() {
            console.log(Object.getOwnPropertyDescriptors(this.example));
            return {
                payload: "Overrided payload"
            };
        }
    };
}
let APIPayload = class APIPayload {
    constructor(m) {
        this.example = m;
    }
    getValue() {
        const test = {
            payload: "hello"
        };
        return test;
    }
};
APIPayload = __decorate([
    Serializable
], APIPayload);
const ap = new APIPayload("Hello");
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
    return function (target, methodName, descriptor) {
        let originalMethod = descriptor.value;
        // value는 함수 그 자체를 가리킨다
        // value 프로퍼티를 변경하여, 함수 자체를 변경
        descriptor.value = () => {
            // 변경 이전 함수
            originalMethod();
            // 변경 이후 함수
            console.log("Changed!!");
        };
    };
}
class Test {
    test() {
        console.log("Not changed");
    }
}
__decorate([
    methodDecorator()
], Test.prototype, "test", null);
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
function writable(writable) {
    return function (target, propertyName) {
        return {
            writable
        };
    };
}
class PropDeco {
    constructor() {
        this.data1 = 0;
        this.data2 = 1;
    }
}
__decorate([
    writable(false)
], PropDeco.prototype, "data1", void 0);
__decorate([
    writable(true)
], PropDeco.prototype, "data2", void 0);
const pd = new PropDeco();
//TypeError: Cannot assign to read only property 'data1' of object '#<PropDeco>'
pd.data1 = 10;
pd.data2 = 20;
//# sourceMappingURL=decorator.js.map