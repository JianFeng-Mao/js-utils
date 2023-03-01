
/**
 * 函数防抖：指定时间内（duration）重复触发，只会执行最后一次触发事件
 * @param {Function} fn 
 * @param {Number} duration 间隔时间
 */
function debounce(fn, duration = 1000) {
  let timer;
  return function(...args) {
    if(timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(null, args);
    }, duration);
  }
}

/**
 * 函数节流：指定时间内（duration）只会执行第一次触发的回调函数，重复触发会被忽略
 * @param {Function} fn 
 * @param {Number} duration 间隔时间
 * @param {Boolean} immediate 是否立即执行
 */
function throttle(fn, duration, immediate = true) {
  if(immediate) {
    let t;
    return function(...args) {
      let now = new Date();
      if(!t || now - t >= duration) {
        t = now;
        fn.apply(null, args);
      }
    }
  } else {
    let timer;
    return function(...args) {
      if(timer) {
        return;
      }

      timer = setTimeout(() => {
        fn.apply(null, args);
        timer = null;
      }, duration)
    }
  }
}