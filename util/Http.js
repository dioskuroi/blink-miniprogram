/**
 * @description Http 请求类
 * @author 徐俊
 */
import { API_BASE_URL, APP_KEY } from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效',
  3000: '期刊不存在'
}

export default class Http {
  request({ url, method = 'GET', data }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: API_BASE_URL + url,
        method,
        data,
        header: {
          'content-type': 'application/json',
          'appkey': APP_KEY
        },
        success: (res) => {
          if (res.statusCode.toString().startsWith('2')) {
            if (this.resHandler) {
              this.resHandler(res, resolve)
            } else {
              resolve(res.data)
            }
          } else {
            this._showError(res.data.error_code)
            reject(res.data)
          }
        },
        fail(err) {
          this._showError(1)
          reject(err)
        }
      })
    })
  }
  _showError(errorCode) {
    wx.showToast({
      title: tips[errorCode],
      icon: 'none',
      duration: 2000
    })
  }
}