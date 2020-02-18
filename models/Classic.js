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

  _getClassic(curIndex, step) {
    return new Promise(resolve => {
      const key = this._getKey(curIndex + step)
      getStorage(key).then(({ data }) => {
        if (data) {
          resolve(data)
          return
        }
        this.request({
          url: `classic/${curIndex}/${step > 0 ? 'next' : 'previous'}`
        }).then(data => {
          resolve(data)
        })
      }).catch(() => {
        this.request({
          url: `classic/${curIndex}/${step > 0 ? 'next' : 'previous'}`
        }).then(data => {
          resolve(data)
        })
      })
    })
  }

  _getKey(index) {
    return `classic-${index}`
  }

  resHandler({ data }, resolve) {
    const key = this._getKey(data.index)
    setStorage(key, data).then(() => {
      resolve(data)
    })
  }
}