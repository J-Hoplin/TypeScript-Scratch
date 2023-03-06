"use strict";
/**
 * Intersection type
 *
 * 타입간의 결합
 */
var _a;
const e1 = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
};
function printEmployeeInformation(emp) {
    // name은 공통 프로퍼티이다.
    console.log('Name : ' + emp.name);
    // 하지만 만약 공통 프로퍼티가 아닌 한쪽에만 있는 경우라면?
    // 이런 경우에는 in 연산자를 사용하여 필드가 있는지 호가인한다
    // type guard가 적용되지 않은 상태에서는 접근 불가
    // console.log(emp.privileges)
    // 아래 조건문을 통해 타입스크립트는 emp가 Admin이라고 추론한다.
    if ('privileges' in emp) {
        console.log(emp.privileges);
        console.log(emp.imadmin);
    }
    if ('startDate' in emp) {
        console.log(emp.startDate);
    }
}
printEmployeeInformation({
    name: 'name',
    startDate: new Date()
});
const fetchedUserData = {
    id: 'u1',
    name: 'max',
    job: {
        title: 'CEO',
        description: 'Own Company'
    }
};
// 위에서는 타입스크립트가 job이라는필드와 title이라는 필드가 존재하는것을 알 수 있다
// 하지만 만약 서버 혹은 api 요청 반환과 같이 보장할 수 없는 경우도 있다.
// 만약 해당 필드가 정의되지 않았다면, 해당 필드에 접근하지 않는다.
console.log(fetchedUserData.job.title);
// 옵셔널 체이닝은 정의되어있는지 보장하지 않는 경우, 필드 앞에 물음표를 추가하면 된다.
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
/**
 * nullish operator
 *
 * 최근에 js표준문법에 추가됨
 *
 */
const userInput = null;
const userInput2 = 0;
const userInput3 = '';
// 일반적으로 null, undefined 뿐만 아니라 0과 빈 문자열도 falsy로 인식한다.
// OR연산자로 처리를 해보자 (Fallback(대체라는 의미)값으로 출력한다
console.log(userInput || 'STRING');
console.log(userInput2 || 'input2');
console.log(userInput3 || 'input3');
// 하지만, null, undefined만 falsy로 취급하고, 0 혹은 빈 문자열은 값으로 쓰고 싶은 경우 '??' 연산자를 사용하여 표기할 수 있다.
const emptyString = '';
const zeroValue = 0;
console.log(emptyString !== null && emptyString !== void 0 ? emptyString : 'value');
console.log(zeroValue !== null && zeroValue !== void 0 ? zeroValue : 10);
//# sourceMappingURL=type2.js.map