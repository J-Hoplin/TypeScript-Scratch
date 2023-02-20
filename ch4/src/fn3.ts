/**
 * 
 * 제네릭 타입의 한정
 * 
 * 제네릭 타입을 언제 구체 타입으로 한정하는지 결정된다.
 */

// 아래 예시를 우선 보자.
// <T>를 호출시그니처 일부로 선언했기에, Filter 타입의 함수를 실제 호출할때 구체 타입을 T로 한정한다.
type Example1 = {
    <T>(array: T[], f: (item: T) => boolean): T[];
}

let example1: Example1 = (array, f) => {
    const res = new Array();
    array.forEach(x => {
        if (f(x)) {
            res.push(x);
        }
    })
    return res;
}

let elements = [
    { firstname: 'hello' },
    { firstname: 'world', secondname: 'typescript' }
]
// Example1 타입 함수를 실제 호출할때 실제 타입을 한정한다.
// 주어진 값에 따라 T의 타입이 결정되게 된다. 
example1(elements, (x) => {
    return x !== undefined;
})

// T의 범위를 타입 별칭으로 한정하기 위해서는 해당 타입을 사용할때 타입을 명시적으로 한정하게 해야한다.
type Example2<T> = {
    (array: T[], f: (item: T) => boolean): T
}

// 이런 경우에는, Filter 사용시, 타입을 명시적으로 한정해야한다.

// let example2: Example2 = {} //'Example2' 제네릭 형식에 1 형식 인수가 필요합니다.ts(2314)

// Example2 사용과 동시에 타입을 지정한다.
let example2: Example2<number> = (arr, f) => {
    return 0;
}

type StringExampleType = Example2<string>
let example3: StringExampleType = (array, f) => {
    return "hello";
}

// T를 시그니처 범위로 한정한 이름을 갖는 함수 호출 시그니처 이다. 아래처럼 되어있는 경우, filtering3를 호출할 때 마다 T값을 가지게 된다.
function filtering3<T>(array: T[], f: (item: T) => boolean): number {
    return 0;
}

// map 함수는 매핑 함수를 이용하여 각 항목을 변환하게 된다.

function map(array: unknown[], f: (item: unknown) => unknown): unknown {
    let result = []
    for (let i = 0; i < array.length; i++) {
        result.push(f(array[i]))
    }
    return result;
}

// 이러한 경우, 매개변수 배열의 타입, 반환되는 값 타입 총 두개의 제네릭이 필요하게 된다.

function map2<T, U>(array: T[], f: (item: T) => U): U[] {
    let result = []
    for (let i = 0; i < array.length; i++) {
        result.push(f(array[i]));
    }
    return result;
}

/**
 * 한정된 다형성
 * 
 * 만약 U 타입은 적어도 T 타입을 포함하는 기능이 필요하다 가정한다
 * 
 * 이런 상황을 U가 T의 상한 한계(upper bound)라고 한다
 */


type TreeNode = {
    value: string
}

type LeafNode = TreeNode & {
    isLeaf: true
}
type InnerNode = TreeNode & {
    // 튜플로 고정
    children: [TreeNode] | [TreeNode, TreeNode]
}


let t1: TreeNode = {
    value: 'a'
}

let t2: LeafNode = {
    value: 'b',
    isLeaf: true,
}

let t3: InnerNode = {
    value: 'c',
    children: [t1, t2]
}


function mapNode<T extends TreeNode>(
    node: T,
    f: (value: string) => string
): T {
    return {
        ...node,
        value: f(node.value)
    }
}

let tn: TreeNode = {
    value: 'a'
}

mapNode(tn, x => x);

/**
 * 여러 제한을 적용한 다형성
 * 
 * 여러 제한을 주어야 하는 경우에는 인터섹션 연산자 (&)를 사용하여 여러개를 붙이면 된다.ㄴ
 * 
 */

type HasSides = {
    numberOfSides: number
}

type SidesHaveLength = {
    sideLength: number
}

// 여기서 T대신 Shape 사용
function logPermiter<Shape extends HasSides & SidesHaveLength>(s: Shape) {
    console.log(s.numberOfSides * s.sideLength);
    return s;
}

type Square = HasSides & SidesHaveLength;
let square: Square = {
    numberOfSides: 10,
    sideLength: 20
}

logPermiter(square)

/**
 * 가변 인수 함수에서도 한정된 다형성을 사용할 수 있다
 * 
 */


const fill = <T extends unknown>(length: number, value: T): T[] => {
    return Array.from({
        length
    }, () => value)
}

function call<T extends unknown[], R>(
    f: (...args: T) => R,
    ...args: T
): R {
    console.log(args)
    return f(...args);
}

call(fill, 10, 30)

type Reserved = {
    value: string
};

type Reservation2 = {
    (destination: string): Reserved
    (from: Date, to: Date, destination: string): Reserved
    (from: Date, destination: string): Reserved
}

let reserve3: Reservation2 = (
    fromOrDestination: Date | string,
    toOrDestinatoin?: Date | string,
    destination?: string
) => {
    let t: Reserved = {
        value: 'test'
    }
    return t;
}

type pp2 = string;

const a10: pp2 = "pl";

let reserve4 = (): pp2 => {
    return "hi";
}

// excersice4

// 튜플 이항배열 최소 길이 보장 성질 활용
function call2<T extends [unknown, string, ...unknown[]], R>(
    f: (...args: T) => R,
    ...args: T
) {

}

//excersice5

const is = <T>(value1: T, ...value2: [T, ...T[]]) => {
    return
}

is([10], [12, 3, 4], [5, 6, 7, 8])