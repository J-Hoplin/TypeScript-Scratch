"use strict";
/**
 * 클래스는 인터페이스를 통해 사용할때가 많다.
 *
 * 앞에서 본 타입별칭처럼, 인터페이스도 타입에 이름을 지어주는 수단이다.
 * 인터페이스를 사용하면 더 깔끔하게 타입을 정의할 수 있다.
 *
 *
 */
// user1은 User타입 충족을 위해서 name,age를 가져야한다.
let user1 = {
    name: 'Name',
    age: 25
};
class Cat {
    constructor() {
        this.name = 'MyCat';
    }
    meow() {
        console.log("meow");
    }
    eat(food) {
        console.log(`Eat ${food}`);
    }
    sleep(hour) {
        console.log(`Sleep ${hour} hour`);
    }
}
class CatUpper extends Cat {
    constructor() {
        super();
        console.log(this.name);
    }
}
const cp = new CatUpper();
//# sourceMappingURL=itf.js.map