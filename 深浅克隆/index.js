/**
 * 浅克隆
 * @param {*} obj 
 */
function shallowClone(obj) {
  // 非object类型直接返回
  if(obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 根据不同类型定义初始值
  let copy = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      copy[key] = obj[key];
    }
  }
  return copy;
}

const isObject = (obj) => typeof obj === 'object' && obj !== null;

/**
 * 深克隆
 * @param {*} obj 
 * @param {WeakMap} hash 
 */
function deepClone(obj, hash = new WeakMap()) {
  // 非object类型直接返回
  if(obj === null || typeof obj !== 'object') {
    return obj;
  }

  if(hash.has(obj)) {
    return hash.get(obj);
  }

  let copy = Array.isArray(obj) ? [] : {}
  hash.set(obj, copy);

  const syms = Object.getOwnPropertySymbols(obj);
  if(syms.length) {
    syms.forEach(sym => {
      copy[sym] = isObject(obj[sym]) ? deepClone(obj[sym], hash) : obj[sym];
    });
  }

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      copy[key] = isObject(obj[key]) ? deepClone(obj[key], hash) : obj[key];
    }
  }

  return copy;
}