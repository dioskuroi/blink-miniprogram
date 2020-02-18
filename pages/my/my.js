// pages/my/my.js
import { getSetting, getUserInfo } from '../../util/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
  },

  onGetUserInfo({ detail }) {
    const { userInfo } = detail
    if (!userInfo) return
    this.setData({
      userInfo,
      authorized: true
    })
  },

  userAuthorized() {
    getSetting().then(data => {
      const authorized = data['scope.userInfo'] || false
      this.setData({
        authorized 
      })
      if (!authorized) return
      getUserInfo().then(({ userInfo }) => {
        this.setData({
          userInfo
        })
      })
    })
  },
  // 如果想从一个小程序跳到另外一个小程序，那么这两个小程序必须同时关联一个公众号（服务号/订阅号）
  onJumpToAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
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