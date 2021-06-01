const { types } = require('util')

{
    9999999999999999 // 16
    // 10000000000000000

    true + 2
    // 3

    '21' + true
    // '21true'

    '21' - true
    // 20

    '21' - - 1
    // 22

    0.1 + 0.2
    // 0.30000000000000004

    0.1 + 0.2 === 0.3
    //false

    3 > 2 > 1
    //false

    3 > 2 >= 1
    // true

    'B' + 'a' + + 'a' + 'a'
    // BaNaNa

    '1' == 1
    // false

    '1' === 1
    // true
}


{
    console.assert(String(123) === '123', 'explicit convertion to string')
    console.assert(123 + '' === '123', 'implicit convertion to string')

    // Or operator
    console.assert(('hello' || 123) === 'hello', '|| returns the first element which is true, fist test')
    console.assert((!'hello' || 123) === 123, '|| returns the first element which is true, second test')
    
    // And operator
    console.assert(('hello' && 123) === 123, '&& returns the first element, when both are true, first test')
    console.assert((!'hello' && 123) === false, '&& returns false when one of them is false')
}


{
    const item = {
        name: 'Raul',
        age: 25
    }

    console.assert(item + 1 === '[object Object]1', 'Do not have toString or valueOf function to Call')
    // 

    // Call first when trying to convert to string, if do not return a primitive value, call valueOf
    item.toString = function () {
        return `| Name: ${this.name} - Age:${this.age} |`
    }

    console.assert(item + 1 === '| Name: Raul - Age:25 |1', 'When is trying to convert to string call toString, if do not return a primitive value, call valueOf')
    // 

    // Call first when trying to convert to number, if do not return a primitive value, call toString
    item.valueOf = function () {
        return this.name.length + this.age
    }

    console.assert(item + 1 === 30, 'When is trying to convert to number call valueOf, if do not return a primitive value, call toString')
    
    item.valueOf = function () {
        return { message: 'This is a new object' }
    }
    
    console.assert(Boolean(Number(item)) === false, 'Try to convert to number, but the valueOf returns an non-primitive value and toString returns a string, so it returns a NaN')

    // Symbol To Primitive is called first than all of others coercion functions
    item[Symbol.toPrimitive] = function (coercionType) {
        return {
            string: JSON.stringify(this),
            number: this.name.length + this.age
        }[coercionType] || types.string
    }

    console.assert(String(item) === '{"name":"Raul","age":25}', 'Call Symbol.toPrimitive function when is trying to convert to string')
    console.assert(Number(item) === 29, 'Call Symbol.toPrimitive function when is trying to convert to number')
    console.assert(String(new Date(item)) === 'Invalid Date', 'Call Symbol.toPrimitive function when is trying to convert to Date')
    console.assert(Boolean(item) === true, 'Call Symbol.toPrimitive function when is trying to convert to Boolean')

    console.log('New Object [Clone and Change]', {
        ...item,
        age: 24
    })
}