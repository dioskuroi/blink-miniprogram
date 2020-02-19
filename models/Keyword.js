import Http from '../util/Http.js'
import { getStorage, setStorage } from '../util/util.js'

export default class KeywordModel extends Http {
  key = 'history'
  maxLength = 10

  getHistory() {
    return getStorage(this.key)
  }

  async setHistory(keyword) {
    try {
      const { data = [] } = await this.getHistory(this.key)
      const has = data.includes(keyword)
      if (!has) {
        const length = data.length
        if (length > this.maxLength) {
          data.pop()
        }
        data.unshift(keyword)
        return await setStorage(this.key, data)
      }
    } catch(err) {
      return Promise.reject(err)
    }
  }

  getHot() {
    return this.request({
      url: 'book/hot_keyword'
    })
  }
}