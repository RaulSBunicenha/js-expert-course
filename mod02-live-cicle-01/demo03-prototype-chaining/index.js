const { deepStrictEqual } = require('assert')

{
    const obj = {}
    const arr = []
    const fn = () => {}

    // internally, literals objects turn to explicit functions
    console.log('new Object() is {}?', new Object().__proto__ === {}.__proto__)
    deepStrictEqual(new Object().__proto__, {}.__proto__)

    // __proto__ is the reference from the object that he has properties
    console.log('obj.__proto__ === Object.prototype', obj.__proto__ === Object.prototype)
    deepStrictEqual(obj.__proto__, Object.prototype)

    console.log('arr.__proto__ === Array.prototype', arr.__proto__ === Array.prototype)
    deepStrictEqual(arr.__proto__, Array.prototype)

    console.log('fn.__proto__ === Function.prototype', fn.__proto__ === Function.prototype)
    deepStrictEqual(fn.__proto__, Function.prototype)

    // The __proto__ from the Object.prototype is null
    console.log('obj.__proto__.__proto__ === null', obj.__proto__.__proto__ === null)
    deepStrictEqual(obj.__proto__.__proto__, null)
}

{
    
}