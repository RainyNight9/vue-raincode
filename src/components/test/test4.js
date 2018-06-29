'use strict'

require('mocha')
const assert = require('assert')
const range = require('../lib/newArray')

describe('creates a new dense array for functional use', () => {
  it('creates range from zero', () => {
    const ranged = range(3)
    assert.deepEqual(ranged, [0, 1, 2])
  })
  it('creates range from one', () => {
    const ranged = range(1, 4)
    assert.deepEqual(ranged, [1, 2, 3])
  })
  it('empty array', () => {
    const ranged = range()
    assert.deepEqual(ranged, [])
  })
  it('zero array', () => {
    const ranged = range('foo')
    assert.deepEqual(ranged, [])
  })
  it('works with map function', () => {
    const ranged = range(4).map(item => item + 1)
    assert.deepEqual(ranged, [1, 2, 3, 4])
  })
  it('works with map function again', () => {
    const ranged = range(5).map(item => item * item)
    assert.deepEqual(ranged, [0, 1, 4, 9, 16])
  })
  it('accepts negatives', () => {
    const ranged = range(-2, 1)
    assert.deepEqual(ranged, [-2, -1, 0])
  })
})
