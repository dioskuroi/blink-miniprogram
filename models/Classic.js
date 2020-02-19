import Http from '../util/Http.js'
import { getStorage, setStorage } from '../util/util.js'

export default class ClassicModel extends Http {
  getLatest() {
    return this.request({
      url: 'classic/latest',
    })
  }

  getPrev(index) {
    return this._getClassic(index, -1)
  }

  getNext(index) {
    return this._getClassic(index, 1)
  }

  getMyFavor() {
    return this.request({
      url: 'classic/favor'
    })
  }

  async _getClassic(curIndex, step) {
    const key = this._getKey(curIndex + step)
    try {
      const { data } = await getStorage(key)
      if (data) {
        return data
      }
      return await this.request({
        url: `classic/${curIndex}/${step > 0 ? 'next' : 'previous'}`
      })
    } catch(err) {
      return await this.request({
        url: `classic/${curIndex}/${step > 0 ? 'next' : 'previous'}`
      })
    }
  }

  _getKey(index) {
    return `classic-${index}`
  }

  resHandler({ data }, resolve) {
    const key = this._getKey(data.index)
    resolve(data)
    setStorage(key, data)
  }
}