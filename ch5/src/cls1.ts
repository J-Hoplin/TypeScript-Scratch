/**
 * typescript class
 * 
 * typescript에서는 접근제어자가 주어지지 않으면 기본적으로 public이 할당된다.
 * 
 * public
 * 
 * priavate
 * 
 * protected 
 * 
 * 이 세가지 접근제어자가 있다.
 * 
 */

/**
 * 추상 클래스는 직접 인스턴스화가 될 수 없다.
 * 
 * 대신 이 추상클래스를 상속받은 클래스를 통해서만 인스턴스화를 허용한다.
 * 
 * moveTo 메소드는 상속받은 클래스에도 기본 구현이 포함되며, 필요에 따라 자손 클래스에서 오버라이딩을 할 수 있다.
 * 
 * canMoveTo와 같은 메소드는 구현된 함수호출 시그니처와 호환되도록 자손클래스에서 구현해야한다.
 * 
 * 즉, 추상클래스를 구현할때는 추상 메소드도 같이 구현해야한다.
 */
abstract class Piece2 {
    protected position: Position;
    constructor(
        private readonly color: Color,
        file: File,
        rank: Rank
    ) {
        this.position = new Position(file, rank);
    }
    moveTo(position: Position) {
        this.position = position;
    }
    // 추상 메소드
    abstract canMoveTo(position: Position): boolean;
}

class Game { }
class Piece {
    protected position: Position
    constructor(
        private readonly color: Color,
        file: File,
        rank: Rank
    ) {
        this.position = new Position(file, rank);
    }
}
class Position {
    constructor(
        private file: File,
        private rank: Rank
    ) {

    }

    public distanceFrom(position: Position) {
        return {
            rank: Math.abs(position.rank - this.rank),
            file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0))
        }
    }
}

class King extends Piece2 {
    public canMoveTo(position: Position): boolean {
        let distance = this.position.distanceFrom(position);
        return distance.rank < 2 && distance.file < 2;
    }
}
class Queen extends Piece { }
class Bishop extends Piece { }

type Color = 'Black' | 'White'
type File = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

class test {
    constructor(
        protected t: string,
        y: number
    ) {
        console.log(this.t)
    }
}

type ChessPiece = Piece | Piece2;

class Game2 {
    private pieces: ChessPiece[] = Game2.makePieces();
    private static makePieces() {
        return [
            new King('White', 'E', 1),
            new Queen('White', 'D', 1)
        ]
    }
}


class test1 {
    protected t1: number = 10;

    protected getT1(): number {
        return this.t1;
    }
}

/**
 * super를 통해서 부모클래스의 메소드만 접근가능하고, 프로퍼티는 접근 불가능하다.
 * 
 */

class test2 extends test1 {
    constructor() {
        super();
        console.log(this)
    }
    public main(): void {
        console.log(this.t1);
    }
}

const tt = new test2();
tt.main();

let set1 = new Set();
set1.add(1).add(2).add(3);
console.log(set1.has(2));
console.log(set1.has(4));

/**
 * 위에 보면 set는 연쇄적인 add를 할 수 있다.
 * 
 * 이는 Set()인스턴스가 지속해서 add()의 결과로 반환되기 때문이다.
 * 
 * 클래스에 지네릭 적용 연습 추가
 */
class SetMock1<T extends unknown>{
    protected values: T[] = new Array<T>();
    public has(item: T): boolean {
        return this.values.includes(item);
    }
    public add(item: T): SetMock1<T> {
        this.values.push(item);
        return this;
    }
}

/**
 * 위에 작성한 SetMock1만 사용한다면 크게 문제되지 않는다.
 * 
 * 반대로 만약 이를 상속받는 다른 클래스가 있다고 가정하자.
 */

class MutableSet<T extends unknown> extends SetMock1<T>{
    constructor() {
        super();
    }
    public delete(item: T): boolean {
        const itemIndex = this.values.indexOf(item);
        if (itemIndex === -1) {
            return false;
        }
        this.values.splice(itemIndex, 1);
        return true;
    }

    public dump(): void {
        // this.add().dump(); // Error : add()의 반환이 dump()에 접근 불가능하다.
        console.log(this.values)
    }
}

/**
 * 아래의 코드가 작동은 하지만, add()메소드를 통해서 반환되는 this는 "SetMock"타입이다.
 * 
 * 그렇기에 MutableSet클래스의 메소드에는 접근하지 못한다.
 */

let setmock = new MutableSet<number>();
setmock.add(1).add(2).add(3);
setmock.dump();

/**
 * 상속 여부와 상관없이 하기 위해서는 this를 반환타입으로 지정해주면 된다.
 * 
 * 그러면 타입스크립트가 this의 반환을 인스턴스 자체에 대한 인스턴스를 반환해준다.
 */

class SetMock2<T extends unknown>{
    protected values: T[] = new Array<T>();
    public has(item: T): boolean {
        return this.values.includes(item);
    }
    public add(item: T): this {
        this.values.push(item);
        return this
    }
}

class MutableSet2<T extends unknown> extends SetMock2<T>{
    public delete(item: T): boolean {
        const itemIndex = this.values.indexOf(item);
        if (itemIndex === -1) {
            return false;
        }
        this.values.splice(itemIndex, 1);
        return true;
    }

    public dump(): void {
        // this.add().dump(); // Success : add()의 반환이 dump()에 접근 가능하다.
        console.log(this.values)
    }
}