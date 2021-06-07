"use strict";var describe,it;module.link('mocha',{describe(v){describe=v},it(v){it=v}},0);var expect;module.link('chai',{expect(v){expect=v}},1);var sinon;module.link('sinon',{default(v){sinon=v}},2);var fs;module.link('fs/promises',{default(v){fs=v}},3);var save;module.link('../src/repository.js',{save(v){save=v}},4);







describe('Repository', () => {

  it('should save a person on database', async () => {
    sinon.stub(
      fs,
      'writeFile'
    ).returns(true)

    sinon.stub(
      fs,
      'readFile'
    ).returns(JSON.stringify([{ id: 1 }]))

    const result = await save({ id: 2 })
    const expected = [{ id: 1 }, { id: 2 }]
    
    expect(result).to.be.deep.equal(expected)
  })
})
