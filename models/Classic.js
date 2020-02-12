import Http from '../util/Http.js'

export default class ClassicModel extends Http {
  getLatest() {
    return this.request({
      url: 'classic/latest',
    })
  }
}