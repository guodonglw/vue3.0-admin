import util from '@/util/index'
import echarts from 'echarts'
import { Vue, Component, Watch } from 'vue-property-decorator'
import { State, Getter, Action } from 'vuex-class';

declare module 'vue/types/vue' {
  interface Vue {
    __resizeHandler: any,
    chart: any,
    pieInitialized: any,
    scatterData: any
  }
}

@Component
export default class myMixins extends Vue {
  // 获取更新后的饼图数据并进行数据简单处理
  public getPieSeriesUpdate(scatterData, chart) {
    return echarts['util'].map(scatterData, function (item, index) {
      var center = chart.convertToPixel('calendar', item);
      return {
        id: index + 'pie',
        center: center
      };
    });
  }

  @State(state => state.app.isFold) isFold!: boolean
  @Watch('isFold')
  onIsFoldChnage(val) {
      this.__resizeHandler()
  }

  private mounted() {
    this.__resizeHandler = util.debounce(() => {
      if (this.chart) {
        this.chart.resize()
        if (this.pieInitialized) {
          this.chart.setOption({
            series: this.getPieSeriesUpdate(this.scatterData, this.chart)
          });
        }   
      }
    }, 500)

    window.addEventListener('resize', this.__resizeHandler)
  } 

  private beforeDestory() {
    window.removeEventListener('resize', this.__resizeHandler)
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  }
} 