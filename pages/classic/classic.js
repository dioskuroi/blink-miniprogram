// pages/classic/classic.js
import ClassicModel from '../../models/Classic.js'
import LikeModel from '../../models/Like.js'

const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fav_nums: 0,
    like_status: 0,
    first: false,
    latest: true,
    latestIndex: 0,
    like_status: 0,
    fav_nums: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest().then(data => {
      this._getClassicLikeStatus(data.id, data.type)
      this.setData({
        ...data,
        latestIndex: data.index,
        frist: false,
        latest: true
      })
    })
  },

  onLike({ detail }) {
    const { behavior } = detail
    const { id: artId, type } = this.data
    likeModel.like({ behavior, artId, type })
  },

  onNext() {
    const { index } = this.data
    classicModel.getNext(index).then(data => {
      this._getClassicLikeStatus(data.id, data.type)
      this.setData({
        ...data,
        latest: data.index === this.data.latestIndex ? true: false,
        first: false
      })
    })
  },

  onPrev() {
    const { index } = this.data
    classicModel.getPrev(index).then(data => {
      this._getClassicLikeStatus(data.id, data.type)
      this.setData({
        ...data,
        first: data.index === 1 ? true : false,
        latest: false
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  _getClassicLikeStatus(artID, type) {
    likeModel.getClassicLikeStatus(artID, type).then(data => {
      this.setData({
        like_status: data.like_status,
        fav_nums: data.fav_nums
      })
    })
  }
})