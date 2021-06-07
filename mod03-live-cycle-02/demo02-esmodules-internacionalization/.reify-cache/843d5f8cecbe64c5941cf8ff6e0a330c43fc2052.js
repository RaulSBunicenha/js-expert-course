"use strict";var describe,it;module.link('mocha',{describe(v){describe=v},it(v){it=v}},0);var expect;module.link('chai',{expect(v){expect=v}},1);var Person;module.link('../src/person.js',{default(v){Person=v}},2);



describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '1 Bike,Car 1500 2011-06-07 2021-06-07'
    )
    
    const expected = new Person({
      id: '1', 
      vehicles: ['Bike', 'Car'],
      kmTraveled: '1500',
      from: '2011-06-07',
      to: '2021-06-07'
    })

    expect(person).to.be.deep.equal(expected)
  })

  it('should format values', () => {
    const person = new Person({
      id: '1', 
      vehicles: ['Bike', 'Car'],
      kmTraveled: '1500',
      from: '2011-06-07',
      to: '2021-06-07'
    })

    const expected = {
      id: 1,
      vehicles: 'Bike and Car',
      kmTraveled: '1,500 km',
      from: 'June 07, 2011',
      to: 'June 07, 2021'
    }

    expect(person.formatted()).to.be.deep.equal(expected)
  })
})
