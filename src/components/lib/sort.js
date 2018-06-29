// default
function defaultComparator (a, b) {
  return a - b
}

module.exports = function checksort (array, comparator) {
  comparator = comparator || defaultComparator

  for(var i=1, len = array.length; i < len;  i++) {
    if (comparator(array[i - 1], array[i]) > 0) {
      return false
    }
  }
  return true
}
