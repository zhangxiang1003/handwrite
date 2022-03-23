/**
 * 
 * @param {Array} promises 
 * 返回第一个有结果的promise无论成功失败
 */
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    // 获取数组长度
    const len = promises.length
    if (len === 0) {
      return resolve([])
    }
    for (let i = 0; i < len; i++) {
      // 需要考虑promises数组内有元素不为promise的情况
      Promise.resolve(promises[i]).then((result) => {
        resolve(result)
      },
        (err) => {
          reject(err)
        })
    }
  })
}

// 测试一下
const p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 1)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 2)
})

Promise.myRace([p1, p2]).then((value) => {
  console.log(value) // 2
})

Promise.myRace([p1, p2, 3]).then((value) => {
  console.log(value)
})