// components/search/index.js
import KeywordModel from '../../models/Keyword.js'

const keywordModel = new KeywordModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    historys: [],
    hots: [],
    books: [],
    total: 0
  },

  attached() {
    keywordModel.getHistory().then(({ data = [] }) => {
      this.setData({
        historys: data
      })
    })
    keywordModel.getHot().then(({ hot: hots }) => {
       this.setData({
         hots
       })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel() {
      this.triggerEvent('cancel')
    },
    onConfirm({ detail }) {
      const { value } = detail
      if (!value) return
      keywordModel.search(0, value).then(({books, total}) => {
        this.setData({
          books,
          total
        })
        keywordModel.setHistory(value).then(() => {
          const { historys } = this.data
          historys.unshift(value)
          this.setData({
            historys
          })
        })
      })
    }
  }
})
