module.exports = (arr, ...args) => {
  const len = args.length
  let idx = -1
  while(idx++ < len) {
    arr = diffArray(arr, args[idx])
  }
  return arr
}

const diffArray = (one, two) => {
  if (!Array.isArray(two)) {
    return one.slice()
  }
  const oneLen = one.length
  const twoLen = two.length
  let idx = -1
  let arr = []

  while (++idx < oneLen) {
    const ele = one[idx]
    let hasEle = false
    for (let i = 0; i < twoLen; i++) {
      const val = two[i]
      if(val === ele) {
        hasEle = true
        break
      }
    }
    if (hasEle === false) {
      arr.push(ele)
    }
  }
  return arr
}
