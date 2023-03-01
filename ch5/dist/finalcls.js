"use strict";
/**
 *
 * 객체지향에서 final 키워드 -> 클래스나 메소드를 확장하거나 오버라이드 할 수 없게 만드는 기능
 *
 * 타입스크립트에서는 private 접근제어자로 final을 흉내낼 수 있다
 */
class MessageQueue {
    constructor(...args) {
    }
}
// private 생성자는 new를 이용해 인스턴스를 생성할 수 없다.
// new MessageQueue();
// 대신 static 멤버를 사용해서 생성하는 방식을 사용할 수 있다
// 간단하게 Singleton 구현하기
class Singleton {
    constructor(...args) {
    }
    static createInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}
//# sourceMappingURL=finalcls.js.map