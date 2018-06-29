/**
 * @author Rain9
 */

 'use strict'

 require('mocha')
 const diff = require('../lib/diffArray.js')
 const assert = require('assert')

 describe('should return diff element of arrays', () => {
   it('should return diff array', () => {
     assert.deepEqual(diff([1, 2, 3], [2, 3, 4]), [1])
     assert.deepEqual(diff([1, 2, 3, 5, 6], [2, 3]), [1, 5, 6])
     assert.deepEqual(diff([1, 1], [2, 3, 4]), [1, 1])
     assert.deepEqual(diff([1, 2, 2, 2, 3, 4, 5], [1, 5]), [2, 2, 2, 3, 4])
   })
   it('should remove all occurrences of an element', () => {
     assert.deepEqual(diff([1, 2, 2, 2, 3], [2]), [1, 3])
   })
   it('should not modify the input array', () => {
     const arr = [1, 2, 2, 2, 3, 4]
     const init = arr.slice()
     diff(arr, [2, 4])
     assert.deepEqual(arr, init)
   })
   it('should diff elements from multiple arrays', () => {
     assert.deepEqual(diff([1, 2, 3, 4, 5], [2], [3, 4]), [1, 5])
   })
   it('should diff elements from empty', () => {
     assert.deepEqual(diff([1, 2, 3, 4], []), [1, 2, 3, 4])
   })
   it('should diff elements from null', () => {
     assert.deepEqual(diff([1, 2, 3], null), [1, 2, 3])
   })
   it('should diff elements from Number', () => {
     assert.deepEqual(diff([1, 2, 3], 1), [1, 2, 3])
   })
   // it('should err', () => {
   //   assert.deepEqual(diff([1, 2, 3]), 1, 2, 3)
   // })
 })
