const contextTypeMap = {
  'number': (context) => new Number(context),
  'string': (context) => new String(context),
  'boolean': (context) => new Boolean(context),
}

/**
 * call: 改变原函数中的this指向，并执行原函数返回原函数的return值
 * fn.call(thisArg, arg1, arg2, ...)
 * @param {*} context 
 * @param {*} args 
 * @returns 
 */
Function.prototype.myCall = function (context, ...args) {
  const contextType = typeof context;
  const SYMBOL_FN = Symbol('fn');

  // 非严格模式下，传递的this值为null或者undefined，会自动替换成全局对象
  if(context === null || context === undefined) {
    context = globalThis;
  } else if(contextType !== 'object') { 
    // 传递的this是原始值，转换为包装对象
    context = contextTypeMap[contextType](context);
  }
  
  // 挂载要调用的方法，这里this就是要执行的方法
  context[SYMBOL_FN] = this;

  // 执行原函数，并返回函数return的值
  let res = context[SYMBOL_FN](...args);

  // 删除挂载到context上的Symbol，避免污染
  let contextSyms = Object.getOwnPropertySymbols(context)
  let delIndex = contextSyms.findIndex(sym => sym === SYMBOL_FN);

  if(delIndex > -1) {
    delete context[contextSyms[delIndex]];
  }

  return res;
}

/**
 * apply的实现原理和call基本类似，区别在于传参是除了参数this外只接收一个参数（数组）作为原函数的参数
 * fn.apply(thisArg, [arg1[, arg2[,...]]])
 * @param {*} context 
 * @param {*} args 
 * @returns 
 */
Function.prototype.myApply = function(context, args) {
  const contextType = typeof context;
  const SYMBOL_FN = Symbol('fn');

  // 非严格模式下，传递的this值为null或者undefined，会自动替换成全局对象
  if(context === null || context === undefined) {
    context = globalThis;
  } else if(contextType !== 'object') { 
    // 传递的this是原始值，转换为包装对象
    context = contextTypeMap[contextType](context);
  }
  
  // 挂载要调用的方法，这里this就是要执行的方法
  context[SYMBOL_FN] = this;

  // 执行原函数，并返回函数return的值
  let res = context[SYMBOL_FN](...args);

  // 删除挂载到context上的Symbol，避免污染
  let contextSyms = Object.getOwnPropertySymbols(context)
  let delIndex = contextSyms.findIndex(sym => sym === SYMBOL_FN);

  if(delIndex > -1) {
    delete context[contextSyms[delIndex]];
  }

  return res;
}

/**
 * bind: 修改原函数的this指向，但不执行原函数，返回一个改变了this执行的新函数
 * @param {*} context 
 * @param {*} args 
 * @return {Function} 
 */
Function.prototype.myBind = function(context, ...args) {
  const contextType = typeof context;

  const SYMBOL_FN = Symbol('fn');

  // 非严格模式下，传递的this值为null或者undefined，会自动替换成全局对象
  if(context === null || context === undefined) {
    context = globalThis;
  } else if(contextType !== 'object') { 
    // 传递的this是原始值，转换为包装对象
    context = contextTypeMap[contextType](context);
  }

  context[SYMBOL_FN] = this;

  return function(...subArgs) {
    let totalArgs = args.concat(subArgs);
    
    let res = context[SYMBOL_FN](...totalArgs);

    let contextSyms = Object.getOwnPropertySymbols(context);
    let delIndex = contextSyms.findIndex(sym => sym === SYMBOL_FN);
    if(delIndex > -1) {
      delete context[contextSyms[delIndex]]
    }
    return res;
  }
}