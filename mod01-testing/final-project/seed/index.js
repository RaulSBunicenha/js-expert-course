const { join } = require('path')
const { writeFile } = require('fs/promises')
const faker = require('faker')

const Car = require('../src/entities/car')
const Customer = require('../src/entities/customer')
const CarCategory = require('../src/entities/carCategory')

const seederBaseFolder = join(__dirname, '../', 'database')
const ITEMS_AMOUT = 2

const carCategory = new CarCategory({
    id: faker.datatype.uuid(),
    name: faker.vehicle.type(),
    carIds: [],
    price: faker.finance.amount(20, 100)
})

const cars = []
const customers = []
for (let index = 0; index < ITEMS_AMOUT; index++) {
    const car = new Car({
        id: faker.datatype.uuid(),
        name: `${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`,
        available: true,
        gasAvaiable: true,
        releaseYear: faker.date.past().getFullYear()
    })

    carCategory.carIds.push(car.id)
    cars.push(car)

    const customer = new Customer({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        age: faker.datatype.number({ max: 50, min: 18 })
    })

    customers.push(customer)
}

const write = async (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data))

;(async () => {
    await write('cars.json', cars)
    await write('carCategories.json', [carCategory])
    await write('customers.json', customers)
})()