// components/classic/music/index.js
import classicBehavior from '../classic-behavior.js'

const mMgr = wx.getBackgroundAudioManager() 

Component({
  behaviors: [classicBehavior],

  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  attached() {
    this.recoverStatus()
    this.monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      let { playing, src } = this.data
      playing = !playing
      if (playing) {
        mMgr.title = src
        mMgr.src = src
      } else {
        mMgr.pause()
      }
      this.setData({
        playing
      })
    },
    recoverStatus() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src === this.data.src) {
        this.setData({
          playing: true
        })
      }
    },
    monitorSwitch() {
      mMgr.onPlay(() => {
        this.recoverStatus()
      })

      mMgr.onPause(() => {
        this.recoverStatus()
      })

      mMgr.onEnded(() => {
        this.recoverStatus()
      })

      mMgr.onStop(() => {
        this.recoverStatus()
      })
    }
  }
})
