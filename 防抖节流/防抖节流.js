// 防抖
const debounce = (fn, delay) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }
}

// 节流
const throttle = () => {
  let timer;
  return function (...args) {
    if (timer) return;
    fn.apply(this, args);
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  }
}