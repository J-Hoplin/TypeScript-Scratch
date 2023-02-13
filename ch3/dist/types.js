"use strict";
/**
 * 타입 별칭
 *
 * 타입별칭으로 타입을 지정할 수 있다.
 */
let age = 55;
let driver = {
    name: "hoplin",
    age
};
let a4;
// Cat type
a4 = {
    name: 'Bonkers',
    purrs: true
};
// Dog type
a4 = {
    name: 'Domino',
    barks: true,
    wags: true
};
// Dog and Cat type
a4 = {
    name: 'Donkers',
    purrs: true,
    barks: true,
    wags: true
};
// Union Type : 두가지 타입을 모두 만족해 주어야 한다
let a5;
// a5 = {
//     name: 'Bonkers',
//     purrs: true
// } // Error, Dogs의 성질들이 없습니다
a5 = {
    name: 'Donkers',
    purrs: true,
    barks: true,
    wags: true
};
function trueOrNull(isTrue) {
    if (isTrue) {
        return 'true';
    }
    return false;
}
//# sourceMappingURL=types.js.map