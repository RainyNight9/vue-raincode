var arrayFirst = require('../lib/arrayFirst')
var assert = require('assert')


describe('arrayFirst', function () {
  it('should arrayFirst', function () {
    assert.equal(arrayFirst(['a', 'b', 'c', 'd', 'e', 'f']), 'a')
  })
  it('should arrayFirst deeply', function () {
    assert.deepEqual(arrayFirst(['a', 'b', 'c', 'd', 'e', 'f'], 2), ['a', 'b'])
    assert.deepEqual(arrayFirst(['a', 'b', 'c', 'd', 'e', 'f'], 3), ['a', 'b', 'c'])
  })
})
