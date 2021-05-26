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