// left传实例，right传类 来做判断
function myInstanceof(left, right) {
  let proto = left.__proto__
  while (true) {
    if (proto === null) return false
    if (proto === right.prototype) {
      return true
    }
    proto = proto.__proto__
  }
}
const arr = []
console.log(myInstanceof(arr, Array))