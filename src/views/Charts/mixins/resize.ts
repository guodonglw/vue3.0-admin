import util from '@/util/index'
import { Vue, Component } from 'vue-property-decorator'

declare module 'vue/types/vue' {
  interface Vue {
    __resizeHandler: any,
    chart: any
  }
}

@Component
export default class myMixins extends Vue {
  __resizeHandler : any

  private mounted() {
    this.__resizeHandler = util.debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)

    window.addEventListener('resize', this.__resizeHandler)
  } 

  private beforeDestory() {
    window.removeEventListener('resize', this.__resizeHandler)
  }
} 