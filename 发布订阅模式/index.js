function noop() {  }


class EventEmitter {
  constructor() {
    this.queue = [];
  }

  // 注册监听事件
  $on(type, fn) {
    fn = typeof fn === 'function' ? fn : noop;
    (this.queue[type] || (this.queue[type] = [])).push(fn);
  }

  // 取消监听事件
  $off(type, fn) {
    if(this.queue[type].length) {
      this.queue[type] = this.queue[type].filter(cb => {
        // $once 注册的事件cb挂载在fn上，所以要加 fn !== cb
        return fn !== cb && fn.cb !== cb;
      });
    }
  }

  // 触发监听事件
  $emit(type, ...args) {
    if(this.queue[type]) {
      let funcs = this.queue[type].slice();
      if(funcs.length) {
        funcs.forEach(func => {
          func.apply(null, args);
        });
      }
    }
  }

  // 注册一次性监听事件，触发一次后则失效（取消）
  $once(type, fn) {
    const _this = this;
    let _once = function(...args) {
      fn.apply(_this, args);
      _this.$off(type, _once);
    }
    this.$on(type, _once);
  }
}