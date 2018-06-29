'use strict'

module.exports = function (arr) {
  return merge(arr, [])
}

function merge (arr, res) {
  var i=0;
  var cur;
  var len = arr.length
  for (; i < len; i++) {
    cur = arr[i]
    Array.isArray(cur) ? merge(cur, res) : res.push(cur)
  }
  return res
}
