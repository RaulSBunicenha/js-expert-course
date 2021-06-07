import { describe, it } from 'mocha'
import { expect } from 'chai'
import Person from '../src/person.js'

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '1 Bike,Car 1500 2011-06-07 2021-06-07'
    )
    
    const expected = new Person({
      id: 1, 
      vehicles: ['Bike', 'Car'],
      kmTraveled: 1500,
      from: '2011-06-07',
      to: '2021-06-07'
    })

    expect(String(person)).to.be.deep.equal(String(expected))
  })
})
