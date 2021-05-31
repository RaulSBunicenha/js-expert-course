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

    console.log('----------')
}

{
    function Employee () {}
    Employee.prototype.salary = () => 'salary**'

    function Supervisor () {}
    // inherits from Employee
    Supervisor.prototype = Object.create(Employee.prototype)
    Supervisor.prototype.profitShare = () => 'profitShare**'

    function Manager () {}
    // inherits from Supervisor
    Manager.prototype = Object.create(Supervisor.prototype)
    Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**'

    // We can call using prototype, but if we call directly we got an error
    // console.log('Manager.salary()', Manager.salary())
    console.log('Manager.prototype.salary()', Manager.prototype.salary())
    deepStrictEqual(Manager.prototype.salary(), 'salary**')

    // If we don't use "new", the first "__proto__" will always be the Function instance, without inheriting from the class
    // To use the class methods without new, you can use prototype
    console.log('Manager.prototype.__proto__ === Supervisor.prototype', Manager.prototype.__proto__ === Supervisor.prototype)
    deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype)

    console.log('----------')

    // When we use "new", the __proto__ gets the prototype value
    console.log(new Manager())
    console.log('manager.__proto__: %s, manager.salary(): %s', new Manager().__proto__, new Manager().salary())
    console.log('Supervisor.prototype === new Manager().__proto__.__proto__', Supervisor.prototype === new Manager().__proto__.__proto__)
    deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__)

    console.log('----------')

    const manager = new Manager()
    console.log('manager.salary()', manager.salary())
    console.log('manager.profitShare()', manager.profitShare())
    console.log('manager.monthlyBonuses()', manager.monthlyBonuses())

    deepStrictEqual(manager.__proto__, Manager.prototype)
    deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype)
    deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype)
    deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype)
    deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null)

    console.log('----------')
}