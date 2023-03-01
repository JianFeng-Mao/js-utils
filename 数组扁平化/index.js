/**
 * 数组扁平化
 * @param {Array} arr 
 * @param {Number} level 需要扁平化的层级，默认值为 1，Infinity表示展开任意深度的嵌套数组
 */
function flatten(arr, level = 1) {
  if(!Array.isArray(arr) || arr.length <= 0) {
    return arr;
  }

  let walk = function(arr, curLevel) {
    return arr.reduce((result, item) => {
      return result.concat(Array.isArray(item) && curLevel < level && level === Infinity ? walk(item, curLevel + 1) : item);
    }, [])
  }
  return walk(arr, 1);
}