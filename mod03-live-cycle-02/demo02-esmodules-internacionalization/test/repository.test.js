import { describe, it } from 'mocha'
import { expect } from 'chai'

import sinon from 'sinon'
import fs from 'fs/promises'

import { save } from '../src/repository.js'

describe('Repository', () => {

  it('should save a person on database', async () => {
    sinon.stub(
      fs,
      'writeFile'
    ).returns(true)

    sinon.stub(
      fs,
      'readFile'
    ).returns(
      JSON.stringify([{ id: 1 }])
    )

    const result = await save({ id: 2 })
    const expected = [{ id: 1 }, { id: 2 }]
    
    expect(result).to.be.deep.equal(expected)
  })
})
