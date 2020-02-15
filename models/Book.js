import Http from '../util/Http.js'

export default class BookModel extends Http {
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  }

  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }

  getDetail(bid) {
    return this.request({
      url: `book/${bid}/detail`
    })
  }

  getLikeStatus(bid) {
    return this.request({
      url: `book/${bid}/favor`
    })
  }

  getComments(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

  getAllBookDetail(bid) {
    return Promise.all([
      this.getDetail(bid),
      this.getComments(bid),
      this.getLikeStatus(bid)
    ]).then(([book, comments, { like_status, fav_nums }]) => {
      return Promise.resolve({ book, comments, likeStatus: like_status, likeCount: fav_nums })
    })
  }
}
