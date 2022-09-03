/**
 * Use type annotation with ":"
 * 
 */

let a:number = 1 + 2
let b:number = a + 3
let c:any = {
    apple: a,
    banana: b
}

let d = c.apple * 10