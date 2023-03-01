/**
 * 函数柯里化：将多参函数变为单参函数
 * @param {Function} fn 
 */
function curry(fn, ...initArgs) {
  if(typeof fn !== 'function') {
    return fn;
  }
  return function(...args) {
    let totalArgs = initArgs.concat(args);
    if(totalArgs.length >= fn.length) {
      return fn.apply(null, totalArgs);
    } else {
      return curry(fn, ...totalArgs);
    }
  }
}