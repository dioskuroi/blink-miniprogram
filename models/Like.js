import Http from '../util/Http.js'

export default class LikeModel extends Http {
  like({ behavior, artId, type }) {
    const url = behavior === 'like' ? 'like' : 'like/cancel'
    this.request({
      url,
      method: 'POST',
      data: {
        art_id: artId,
        type
      }
    })
  }
}