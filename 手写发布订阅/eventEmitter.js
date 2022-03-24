class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => {
        callback(...args);
      });
    }
  }
  once(eventName, callback) {
    const self = this;
    function onceCallback() {
      callback.apply(self, arguments);
      self.off(eventName, onceCallback);
    }
    this.on(eventName, onceCallback);
  }
  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    }
  }
}


// 测试
const e1 = new EventEmitter()

const e1Callback1 = (name, sex) => {
  console.log(name, sex, 'evt1---callback1')
}
const e1Callback2 = (name, sex) => {
  console.log(name, sex, 'evt1---callback2')
}
const e1Callback3 = (name, sex) => {
  console.log(name, sex, 'evt1---callback3')
}

e1.on('evt1', e1Callback1)
e1.on('evt1', e1Callback2)
e1.once('evt1', e1Callback3)
e1.emit('evt1', '前端胖头鱼', 'boy')
console.log('------尝试删除e1Callback1------')
e1.off('evt1', e1Callback1)
e1.emit('evt1', '前端胖头鱼', 'boy')

