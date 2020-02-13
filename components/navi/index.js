// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    first: {
      type: Boolean
    },
    latest: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftSrc: 'images/triangle@left.png',
    disLeftSrc: 'images/triangle.dis@left.png',
    rightSrc: 'images/triangle@right.png',
    disRightSrc: 'images/triangle.dis@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft() {
      if (this.properties.latest) return
      this.triggerEvent('left')
    },
    onRight() {
      if (this.properties.first) return
      this.triggerEvent('right')
    }
  }
})
