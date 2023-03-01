class Animal { }
class Bird extends Animal {
    public chrip(): void {

    }
}
class Crow extends Bird {
    public caw() {

    }
}

function chirp(bird: Bird) {

}

type BirdCallback = (bird: Bird) => Bird


function clone(cb: BirdCallback) {
    let parent = new Bird()
    let baby = cb(parent)
    baby.chrip()
}

function BirdToAnimal(bird: Bird): Animal {
    return new Animal();
}

function BirdToCrow(bird: Bird): Crow {
    return new Crow();
}

/**
 * TS2345: Argument of type '(bird: Bird) => typeof Animal' is not assignable to parameter of type 'BirdCallback'.
  Property 'chrip' is missing in type 'typeof Animal' but required in type 'Bird'.
 *
 */
// clone(BirdToAnimal)


clone(BirdToCrow)