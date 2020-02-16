// pages/book-detail/book-detail.js
import BookModel from '../../models/Book.js'
import LikeModel from '../../models/Like.js'

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // options 中可以接收到 url 传递的参数
  onLoad: function (options) {
    this.getAllBookData(options)
  },

  getAllBookData({ bid }) {
    bookModel.getAllBookDetail(bid).then(data => {
      this.setData({
        ...data
      })
    })
  },

  onLike({ detail }) {
    const { behavior } = detail
    const { id: artId } = this.data.book
    likeModel.like({ behavior, artId, type: 400 })
  },

  onFakePost() {
    this.setData({
      posting: true
    })
  },

  onCancel() {
    this.setData({
      posting: false
    })
  },

  onPost({ detail }) {
    const { id } = this.data.book
    const { text, value } = detail
    const content = text || value
    if (content.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    if (!content) {
      wx.showToast({
        title: '请输入短评',
        icon: 'none'
      })
      return
    }

    bookModel.postComment(id, content).then(data => {
      wx.showToast({
        title: '+ 1',
        icon: 'none'
      })

      const { comments } = this.data
      comments.unshift({
        content,
        nums: 1
      })
      this.setData({
        comments,
        posting: false
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

  }
})