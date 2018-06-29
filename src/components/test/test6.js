'use strict'

require('mocha')
var assert = require('assert')
var merge = require('../lib/merge')

describe('merge', function () {
  it('should merge nested arrays', function () {
    assert.deepEqual(merge(['a', 'b', ['c'], ['d'], ['e']]), ['a', 'b', 'c', 'd', 'e'])
  })
  it('should merge deeply nested arrays:', function () {
    assert.deepEqual(merge(['a', [[[[[[[['b', [['c']]]]]], 'd', ['e']]]]]]), ['a', 'b', 'c', 'd', 'e'])
    assert.deepEqual(merge(['a', 'b', ['c'], 'd', ['e']]), ['a', 'b', 'c', 'd', 'e'])
  })
})
