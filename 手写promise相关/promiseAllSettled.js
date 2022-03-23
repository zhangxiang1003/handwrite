/**
 * 
 * @param {Array} promises
 * 会返回promise数组的所有结果，不论fulfilled还是rejected 
 * 不论结果，自身都是fulfilled
 */
Promise.myAllSettled = function (promises) {
  return new Promise(resolve => {
    // 获取数组长度
    const len = promises.length
    if (len === 0) {
      return resolve([])
    }
    const results = []
    let count = 0
    for (let i = 0; i < len; i++) {
      // 需要考虑promises数组内有元素不为promise的情况
      let promise = Promise.resolve(promises[i])
      promise.then((result) => {
        results[i] = {
          status: 'fulfilled',
          value: result,
        }
        count++
        if (count === len) {
          resolve(results)
        }
      },
        (error) => {
          results[i] = {
            status: 'rejected',
            reason: error,
          }
          count++
          if (count === len) {
            resolve(results)
          }
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

const p6 = Promise.myAllSettled([p1, p2, p3, p4, p5])
  .then(console.log)
  .catch(console.log)