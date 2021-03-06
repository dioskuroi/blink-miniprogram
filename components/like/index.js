// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean, // 默认值为 false
      // value: false   // 可以自定义默认值
    },
    count: {
      type: Number  // 默认值为 0
    },
    readOnly: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: './images/like.png',
    noSrc: './images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike() {
      if (this.properties.readOnly) return
      let like = this.properties.like
      let count = this.properties.count
      like = !like
      count = like ? count + 1 : count - 1

      this.setData({
        like,
        count
      })
      const behavior = like ? 'like' : 'cancel'
      this.triggerEvent('like', { behavior })
    }
  }
})
