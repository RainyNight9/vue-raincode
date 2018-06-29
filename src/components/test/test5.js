'use strict'

require('mocha')
var assert = require('assert')
var deldup = require('../lib/deldup')

describe('deldup', function () {
  it('should remove duplicates', function () {
    var deldupd = deldup([1, 1, 2, 3, 4, 5, 6])
    assert.deepEqual(deldupd, [1, 2, 3, 4, 5, 6])
  })
  it('should remove multiple duplicates', function () {
    var deldupd = deldup([1, 2, 3, 3, 3, 3, 4, 4, 4, 5, 6])
    assert.deepEqual(deldupd, [1, 2, 3, 4, 5, 6])
  })
  it('should remove multiple duplicates of multiple values', function () {
    var deldupd = deldup([1, 2, 3, 3, 3, 3, 4, 5, 6, 1, 1, 1, 1])
    assert.deepEqual(deldupd, [1, 2, 3, 4, 5, 6])
  })
  it('should remove duplicates of complex values', function () {
    var deldupd = deldup([{a: 1}, {a: 2}, {a: 3}, {a: 3}])
    assert.deepEqual(deldupd, [{a: 1}, {a: 2}, {a: 3}])
  })
  it('should remove dulicates of complex values when useing a custom hasher', function () {
    var deldupd = deldup([{a: 1, b: 1}, {a: 2, b: 2}, {a: 3, b: 3}, {a: 3, b: 4}], function(ele) {
      return ele.a
    })
    assert.deepEqual(deldupd, [{a: 1, b: 1}, {a:2, b: 2}, {a: 3, b: 3}])
  })

  it('should remove date duplicates', function () {
    var myDate = new Date(2018, 4, 18)
    var deldupd = deldup([myDate, myDate, myDate])
    assert.deepEqual(deldupd, [myDate])
  })
  it('should remove date duplicates inside a complex object', function () {
    var myDate = new Date(2018, 4, 18)
    var deldupd = deldup([{date: myDate}, {date: myDate}, {date: myDate}])
    assert.deepEqual(deldupd, [{date: myDate}])
  })
})
