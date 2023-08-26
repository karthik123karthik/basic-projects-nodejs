// every thing in the javascript is an Object
// when you create any object or a array or a function or a variable an Object called
// prototype is attached which will give access to inbuilt methods

let var1 = 20

let var2 = [10, 20, 30]

console.log(var2.__proto__.__proto__);

console.log(Object.prototype.constructor)

class Animal{
    constructor(mode){
        this.mode = mode
    }
}

console.log(Animal.__proto__ === Function.prototype)
console.log(Function.prototype.__proto__ === Object.prototype)