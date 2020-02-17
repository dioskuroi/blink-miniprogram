import Http from '../util/Http.js'
import { getStorage, setStorage } from '../util/util.js'

export default class KeywordModel extends Http {
  key = 'history'
  maxLength = 10

  getHistory() {
    return getStorage(this.key)
  }

  setHistory(keyword) {
    return new Promise((resolve, reject) => {
      this.getHistory(this.key).then(({ data = [] }) => {
        const has = data.includes(keyword)
        if (!has) {
          const length = data.length
          if (length > this.maxLength) {
            data.pop()
          }
          data.unshift(keyword)
          setStorage(this.key, data).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        }
      })
    })
  }

  getHot() {
    return this.request({
      url: 'book/hot_keyword'
    })
  }
}