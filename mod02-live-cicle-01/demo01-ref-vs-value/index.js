'use strict'
const { deepStrictEqual } = require('assert')

{
    // Call Stack - Primitive Types
    let counter = 0
    let counter2 = counter
    counter2++
    console.log(`First counter is:`, counter) // The value is 0, because was copy
    console.log(`Second counter is:`, counter2) // The value is 2
    deepStrictEqual(counter, 0)
    deepStrictEqual(counter2, 1)
}

{
    // Memory Heap - Reference Types
    let item = { counter: 0 }
    let item2 = item
    
    item2.counter++
    deepStrictEqual(item, { counter: 1 })

    item.counter++
    deepStrictEqual(item2, { counter: 2 })

    
    console.log(`First Item counter is:`, item.counter) // The value is 0, because the memory reference was copy
    console.log(`First Item counter is:`, item2.counter) // The value is 2
}