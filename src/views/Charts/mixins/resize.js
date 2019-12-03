import util from '@/util/index'

export default {
  mounted() {
    this.__resizeHandler = util.debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)

    window.addEventListener('resize', this.__resizeHandler)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.__resizeHandler)
  }
}