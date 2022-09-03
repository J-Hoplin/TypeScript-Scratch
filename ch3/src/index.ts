/**
 * 대표적인 TypeScript의 Type종류
 * 
 * 1. Boolean
 * 2. number : 연산과 숫자 호출에 사용할 수있는 모든 메소드까지 포함
 * 3. string : 문자열과 문자열 호출에 사용할 수 있는 모든 메소드까지 포함
 * 
 */

function square(n:number){
    return n*n;
}

square(4);

/**
 * any : 모든 타입을 커버하는 타입이다. any는 필요한 상황이 아니면 사용하지 않는것이 좋다.
 * 
 * 개발자와 tsc모두 타입을 알 수 없는경우 any를 기본타입으로 가정하지만, 이는 typescript사용의 이유를 없앤다.
 * 
 * tsconfig에 noImplicitAny를 사용하면, 암묵적으로 any가 나타났을때 예외를 일으킨다. tsconfig.json에 noImplicitAny를 활성화하면 된다.
 * 만약 strict를 true로 했다면 할 필요 없다.
 * 
 */

const a:any = "hi"
square(a); // square함수에 number라고 타입 명시를 해주었지만, any로 하였기에 tsc가 오류로 판별하지 않는다.


/**
 * unknown : any와 동일하기 타입을 알 수 없는 값에 대해서 사용한다.
 * 
 * 하지만 any와 차이점이라면, unknown타입은 타입 정제가 이루어지기 전까지는 unknown타입을 타입스크립트가 사용하지 못하게 강제된다.
 * 그렇기 때문에, 타입을 알 수 없는 상황에서는 가급적 unknown을 사용한다.
 * 
 * unknown타입은 비교연산과 반전연산(!)을 지원하며, typeof, instanceof연산자로 정제를 해줄 수 있다.
 */

let d:unknown = 30
let e = d === 123
//let f = d + 10 // Type is Unknown

// 아래와 같이 typeof연산자로 정제를 해줄 수 있다.
if(typeof d === 'number'){
    let f = d + 10
}