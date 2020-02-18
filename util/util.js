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

export function getSetting() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: function({ authSetting }) {
        resolve(authSetting)
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}

export function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: function(data) {
        resolve(data)
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}