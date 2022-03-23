/**
 * 
 * @param {Array} promises 
 * promise.all是必须promises数组内状态全部为fulfilled才返回一个装有结果的数组
 * 否则返回第一个状态为rejected的promise的报错
 */
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    // 获取数组长度
    const len = promises.length
    if (len === 0) {
      return resolve([])
    }
    const results = []
    let count = 0
    for (let i=0; i<len; i++) {
      // 需要考虑promises数组内有元素不为promise的情况
      let promise = Promise.resolve(promises[i])
      promise.then((result) => {
        results[i] = result
        count++
        if (count === len) {
          resolve(results)
        }
      },
      (err) => {
        reject(err)
      })
    }
  })
}


// 测试一下
const p1 = Promise.resolve(1)
const p2 = new Promise((resolve) => {
  setTimeout(() => resolve(2), 1000)
})
const p3 = new Promise((resolve) => {
  setTimeout(() => resolve(3), 3000)
})

const p4 = Promise.reject('err4')
const p5 = Promise.reject('err5')
// 1. 所有的Promise都成功了
const p11 = Promise.myAll([ p1, p2, p3 ])
	.then(console.log) // [ 1, 2, 3 ]
      .catch(console.log)
      
// 2. 有一个Promise失败了
const p12 = Promise.myAll([ p1, p2, p4 ])
	.then(console.log)
      .catch(console.log) // err4
      
// 3. 有两个Promise失败了，可以看到最终输出的是err4，第一个失败的返回值
const p13 = Promise.myAll([ p1, p5, p4 ])
	.then(console.log)
      .catch(console.log) // err4