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

  async getAllBookDetail(bid) {
    const [book, { comments }, { like_status, fav_nums }] = await Promise.all([
      this.getDetail(bid),
      this.getComments(bid),
      this.getLikeStatus(bid)
    ])
    return { book, comments, likeStatus: like_status, likeCount: fav_nums }
  }

  postComment(bid, content) {
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content
      }
    })
  }

  search(start, q) {
    return this.request({
      url: 'book/search?summary=1',
      data: {
        q,
        start
      }
    })
  }
}
