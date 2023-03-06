/**
 * Intersection type
 * 
 * 타입간의 결합
 */

type Admin = {
    name: string
    privileges: string[]
    imadmin?:true
};

type Employee = {
    name: string;
    startDate: Date;
}


type ElevatedEmployee = Admin & Employee

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
}

// 위 타입별칭들은, interface로도 구현 가능하다.
interface Adminitf{
    name: string
    privileges: string[]
}

interface Employeeitf{
    name: string
    startDate: Date
}

interface ElevatedEmployeeitf extends Adminitf, Employeeitf{}

/**
 * Optional Chaining
 * 
 * 특정 필드가 존재한다는것이 보장되지 않는경우에 사용한다.
 * 
 */

/**
 * Type Guard (= 타입정제)
 * 
 * 즉 타입정제(타입가드)는 속성이나 메소드를 사용하기 이전에 존재의 여부 혹은 타입을 검사하는 작업인것이다.
 * 
 * 타입 정제에서 이어서 
 * 
 * instanceof, in, typeof를 활용한다.
 */

type UnknownEmployee = Employee | Admin;

/**
 * 
 * TypeGuard in inteface or type alias 
 * 
 * type alias, interface는 컴파일 시간에만 존재하고, 자바스크립트로 변환되지 않는다
 * 
 * 그리고 typeof같은 경우 기본적으로 원시타입에 대해서만 검사가 가능하다.
 */

function printEmployeeInformation(emp: UnknownEmployee){
    // name은 공통 프로퍼티이다.
    console.log('Name : ' + emp.name);
    // 하지만 만약 공통 프로퍼티가 아닌 한쪽에만 있는 경우라면?
    // 이런 경우에는 in 연산자를 사용하여 필드가 있는지 호가인한다

    // type guard가 적용되지 않은 상태에서는 접근 불가
    // console.log(emp.privileges)

    // 아래 조건문을 통해 타입스크립트는 emp가 Admin이라고 추론한다.
    if('privileges' in emp){
        console.log(emp.privileges)
        console.log(emp.imadmin)
    }
    if('startDate' in emp){
        console.log(emp.startDate)
    }
}

/**
 * 
 * Type Guard in class
 * 
 * instanceOf를 활용한다.
 * 
 */

class Car{
    drive(){
        console.log("Driving...")
    }
}

class Truck{
    drive(){
        console.log("Driving...")
    }
    loadCargo(amount:number){
        console.log("Loading Cargo..." + amount)
    }
}

type Vehicle = Car | Truck

const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle: Vehicle){
    vehicle.drive();
    if(vehicle instanceof Truck){
        vehicle.loadCargo(10);
    }
}



printEmployeeInformation({
    name: 'name',
    startDate: new Date()
})

const fetchedUserData = {
    id: 'u1',
    name: 'max',
    job: {
        title: 'CEO',
        description : 'Own Company'
    }
}


/**
 * 
 * 차별화된 Union
 * 
 * 타입 정제를 조금 더 편하게 만들어주는 문법이다.
 */


interface Bird{
    flyingSpeed: number
}

interface Horse{
    runningSpeed: number
}
type Animal = Bird | Horse

function moveAnimal(animal:Animal){
    if('flyingSpeed' in animal){
        animal.flyingSpeed;
    }
}

/**
 * 
 * 위의 경우처럼 in연산자로 처리할 수 있지만
 * 
 * 대신 모든 타입에 동일하게 적용되는 속성을 추가함으로서 구별된 유니온을 구현할 수 있다.
 * 
 */

interface Bird1{
    type: 'bird'; // Literal Type
    flyingSpeed: number
}

interface Horse1{
    type: 'horse'
    runningSpeed: number
}
type Animal2 = Bird1 | Horse1

function moveAnimal2(animal: Animal2){
    let speed:number;
    switch(animal.type){
        case 'bird':
            speed = animal.flyingSpeed;
            break;
            case 'horse':
                speed = animal.runningSpeed;
                break;
    }
}

move 

// 위에서는 타입스크립트가 job이라는필드와 title이라는 필드가 존재하는것을 알 수 있다
// 하지만 만약 서버 혹은 api 요청 반환과 같이 보장할 수 없는 경우도 있다.
// 만약 해당 필드가 정의되지 않았다면, 해당 필드에 접근하지 않는다.
console.log(fetchedUserData.job.title);

// 옵셔널 체이닝은 정의되어있는지 보장하지 않는 경우, 필드 앞에 물음표를 추가하면 된다.
console.log(fetchedUserData?.job?.title);

/**
 * nullish operator
 * 
 * 최근에 js표준문법에 추가됨
 * 
 */

const userInput = null;
const userInput2 = 0;
const userInput3 = ''

// 일반적으로 null, undefined 뿐만 아니라 0과 빈 문자열도 falsy로 인식한다.
// OR연산자로 처리를 해보자 (Fallback(대체라는 의미)값으로 출력한다

console.log(userInput || 'STRING')
console.log(userInput2 || 'input2')
console.log(userInput3 || 'input3')

// 하지만, null, undefined만 falsy로 취급하고, 0 혹은 빈 문자열은 값으로 쓰고 싶은 경우 '??' 연산자를 사용하여 표기할 수 있다.

const emptyString = ''
const zeroValue = 0

console.log(emptyString ?? 'value');
console.log(zeroValue ?? 10);