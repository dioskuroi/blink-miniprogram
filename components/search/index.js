// components/search/index.js
import KeywordModel from '../../models/Keyword.js'
import BookModel from '../../models/Book.js'
import { getSystemInfo } from '../../util/util.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

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
    total: 0,
    pageIndex: 0,
    searching: false,
    keyword: '',
    height: 100,
    loadingCenter: false,
    loadingBottom: false
  },

  attached() {
    getSystemInfo().then(({ windowHeight}) => {
      this.setData({
        height: windowHeight
      })
    })

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
      const { value, text } = detail
      const keyword = text || value
      if (!keyword) return
      this.setData({
        searching: true,
        loadingCenter: true,
        keyword
      })

      bookModel.search(0, keyword).then(({books, total}) => {
        this.setData({
          books,
          total,
          keyword,
          pageIndex: 0,
          loadingCenter: false
        })
        keywordModel.setHistory(keyword).then(() => {
          const { historys } = this.data
          historys.unshift(keyword)
          this.setData({
            historys
          })
        })
      }).catch(() => {
        this.setData({
          loadingCenter: false
        })
      })
    },
    onDelete() {
      this.setData({
        searching: false,
        books: []
      })
    },
    loadMore() {
      const { pageIndex, total, keyword, books, loadingBottom } = this.data
      if (loadingBottom) return
      const currentIndex = (pageIndex + 1) * 20
      if (currentIndex >= total) return
      this.setData({
        loadingBottom: true
      })
      bookModel.search(currentIndex, keyword).then(({ books: newBooks, total }) => {
        this.setData({
          books: books.concat(newBooks),
          total,
          keyword,
          pageIndex: pageIndex + 1,
          loadingBottom: false
        })
      }).catch(() => {
        this.setData({
          loadingBottom: false
        })
      })
    }
  }
})
