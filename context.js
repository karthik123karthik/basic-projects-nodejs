let Person = {
name: "Karthik G K",
getDetail: function(){
    return `name is ${this.name}`
}
}

let newfunction  = Person.getDetail.bind({name : "not me"})
console.log(newfunction())

console.log(Person.getDetail())

// bind will attach new context to the function - changes the this value pointing

let details = Person.getDetail;
console.log(details())


// call used to immedeiately call the function 

console.log(Person.getDetail.call(Person));

// apply is same as the call by take array of arguements

console.log(Person.getDetail.apply(Person,[]));