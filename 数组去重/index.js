/**
 * 数组去重（es5写法）
 * @param {Array} arr 
 */
function uniqueES5(arr) {
  if(!Array.isArray(arr) || arr.length <= 0) {
    return arr;
  }

  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  })
}


/**
 * 数组去重（es6写法）
 * @param {Array} arr 
 */
function uniqueES6(arr) {
  if(!Array.isArray(arr) || arr.length <= 0) {
    return arr;
  }
  return [ ...new Set(arr) ]
}