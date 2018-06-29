"use strict"

var isNumber = require('is-number')
var slice = require('array-slice')

module.exports = function arrayFirst(arr, num) {
  if (!Array.isArray(arr)) {
    throw new Error('array-first expects an array as the first argument')
  }
  if (arr.length === 0) {
    return null
  }
  var first = slice(arr, 0, isNumber(num) ? +num : 1)
  if(+num === 1 || !num) {
    return first[0]
  }
  return first
}
