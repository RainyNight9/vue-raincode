
var sorted = require('../lib/sort')
var fixtures = require('./test8.json')
var tape = require('tape')

console.log(sorted([3, 2, 1]))

var comparators = {
  descending: function (a, b) {return b - a }
}
fixtures.forEach(function(f) {
  tape('returns ' + f.expected + ' for ' + f.array, function (t) {
    t.plan(1)

    var actual = sorted(f.array, comparators[f.comparator])
    t.equal(actual, f.expected)
  })
})
