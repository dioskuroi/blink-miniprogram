export function getStorage(key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success(res) {
        resolve(res)
      },
      fail(err) {
        resolve({ data: undefined })
      }
    })
  })
}

export function setStorage(key, data) {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key,
      data,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export function getSystemInfo() {
  return new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success: function(res) {
        resolve(res)
      },
      fail: function(res) {
        reject(res)
      }
    })
  })
}