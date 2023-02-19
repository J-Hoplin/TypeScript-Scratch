/**
 * 함수 매개변수의 경우에는 타입을 명시적으로 적어준다
 * -> 타입스크립트는 매개변수를 추론하지 않는다. 특별한 경우(문맥적 타입화)를 제외하고는,추론하지 않는다
 * 
 * 반환타입은 자동으로 추론하지만, 명시가 가능하다
 * 
 */

function add(a: number, b: number): number {
    return a + b;
}

/**
 * 타입스크립트는 함수 생성자 방식을 제외하고는 모든 문법을 안전하게 지원한다
 * 
 * 되도록이면 함수 생성자 방식 사용 x(원래도 안썼지만)
 */

function greet1(name: string): string {
    return `hello ${name}`;
}

let greet2 = function (name: string): string {
    return `hello ${name}`;
}

let greet3 = (name: string): string => {
    return `hello ${name}`
}

let greet4 = (name: string): string => {
    return `hello ${name}`;
}

// ? 를 통해 선택적 매개변수를 지정할 수 있다.
function log(message: string, userId?: string) {
    let time = new Date().toLocaleDateString();
    console.log(time, message, userId || "Not signed in");
}

log('Page load')

// 매개변수에 기본값을 지정해줄 수 있다. 단 이런 경우, 선택적 매개변수라도 ?를 붙일필요 없다
// 기본값을 붙이면 타입 또한 적어주지 않아도 된다. 기본값을 기반으로, 타입을 추론한다.

function log2(message: string, userId = "Not signed in") {
    let time = new Date().toLocaleDateString();
    console.log(time, message, userId);
}

// 기본 매개변수 또한 타입을 명시할 수 있다. 단 이런 경우에는 타입 명시까지 하는것이 더 명확할 것 같다.
type Context = {
    appId?: string,
    userId?: string
}

function log3(message: string, context: Context = {}) {

}

/**
 * 나머지 매개변수
 * 
 * 가변인자를 받는 경우도 있다. arguments를 사용하여 가변인자를 처리하며
 * arguments는 순수한 배열이 아니므로, 배열로 변환이 한번 필요하다.
 * 
 */

function sumVardic(): number {
    return Array.from(arguments).reduce((accumulator, currentvalue) => { return accumulator + currentvalue }, 0)
}


// 이런 경우에, 인자가 0개 필요하지만 4개가 제공되었다는 오류가 나오게 된다.
// sumVardic(1, 2, 3, 4);

// 이러한 가변 인자는 Rest Parameter를 통해서 해결할 수 있다. 안전하지 않은 arguments를 대신해서 사용한다


function sumVardic2(...numbers: number[]): number {
    return numbers.reduce((accumulator, currentvalue) => accumulator + currentvalue, 0)
}


// 가변인자에 여러 타입이 들어간다면?
function test1(...args: (number | string | boolean)[]): void {
    args.map(x => {
        console.log(x);
    })
}

test1('hello', 'world', 'typescript', 123, true, 1234, false)