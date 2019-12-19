import util from '@/util/index'
import { Vue, Component, Watch } from 'vue-property-decorator'
import { State, Getter, Action } from 'vuex-class';

declare module 'vue/types/vue' {
  interface Vue {
    __resizeHandler: any,
    chart: any
  }
}

@Component
export default class myMixins extends Vue {
  __resizeHandler : any

  // 侧边栏折叠事件发生时触发resize
  @State(state => state.app.isFold) isFold!: boolean
  @Watch('isFold')
  onIsFoldChnage(val) {
      this.__resizeHandler()
  }

  private mounted() {
    this.__resizeHandler = util.debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 500)

    window.addEventListener('resize', this.__resizeHandler)
  } 

  private beforeDestory() {
    window.removeEventListener('resize', this.__resizeHandler)
  }
} 