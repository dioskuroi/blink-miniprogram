import Http from '../util/Http.js'

export default class BookModel extends Http {
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  }
}
