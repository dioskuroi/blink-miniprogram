// components/epsoide/index.js

const monthList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

Component({
  /**
   * 组件的属性列表
   */
  // 如果在 properties 和 data 中设置了相同对变量名，那么 properties 会覆盖 data 中的变量
  properties: {
    index: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: '',
    month: ''
  },

  attached() {
    this.setCurrentDate()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setCurrentDate() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth()
      this.setData({
        year,
        month: monthList[month]
      })
    }
  }
})
