"use strict";
/**
 *
 * companion types
 *
 * 타입스크립트에서 타입과 값은 별도의 네임스페이스를 가지게 된다.
 *
 * 즉 하나의 이름으로 값과 타입 모두 연결할 수 있다는 의미이다.
 *
 * 이 패턴을 사용하면, 하나의 이름으로 값, 타입 모두 반환할 수 있다.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = void 0;
let Currency = {
    default: 'USD',
    from(value, unit) {
        return {
            unit,
            value
        };
    }
};
exports.Currency = Currency;
//# sourceMappingURL=companion.js.map