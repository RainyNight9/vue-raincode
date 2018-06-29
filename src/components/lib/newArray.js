'use strict'

const newArray = (start, end) => {
  let isStartNum = typeof start === 'number'
  let isEndNum = typeof end === 'number'

  if (isStartNum && !isEndNum) {
    end = start
    start = 0
  } else if (!isStartNum && !isEndNum) {
    start = 0
    end = 0
  }
  start = start|0
  end = end|0

  const len = end - start
  if (len < 0) {
    throw new Error('array length must be positive')
  }
  let arr = new Array(len)
  for(let i = 0, c = start; i<len; i++, c++ ) {
    arr[i] = c
  }
  return arr
}
module.exports = newArray
