'use strict'

function deldup (client, hasher) {
  hasher = hasher || JSON.stringify
  var clone = []
  var lookup = {}
  var len = client.length
  for (var i=0; i < len; i++) {
    var ele = client[i]
    var hashed = hasher(ele)
    if (!lookup[hashed]) {
      clone.push(ele)
      lookup[hashed] = true
    }
  }
  return clone
}
module.exports = deldup
