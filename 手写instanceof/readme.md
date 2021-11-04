## 手写instanceof
instanceof原理就是通过实例的隐式原型（__proto__）往上找，直到找到原型链的尽头，看有没有值指向类的显式原型（prototype）