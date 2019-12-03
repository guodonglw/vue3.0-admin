<template>
  <div id="chartLine" style="width:100%; height:400px;"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import util from '@/util/index'
declare let echarts: any;

@Component
export default class LineChart extends Vue{
  chartLine: any
  __resizeHandler: any

  public drawChart(): void {
    this.chartLine = echarts.init(document.getElementById('chartLine'));
    this.chartLine.setOption({
      title: {
        text: '折线图'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data:['实际情况','理想']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {}
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name:'实际情况',
          type:'line',
          smooth: true,
          data:[500, 700, 650, 500, 400, 350, 500]
        },
        {
          name:'理想',
          type:'line',
          smooth: true,
          data:[500, 300, 250, 500, 750, 700, 500]
        }
      ]
    })
  }

  private mounted() {
    this.drawChart()
    this.__resizeHandler = util.debounce(() => {
      if (this.chartLine) {
        this.chartLine.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  }

  private beforeDestroy() {
    window.removeEventListener('reseize', this.__resizeHandler)
    this.chartLine.dispose()
    this.chartLine = null
  }
}
</script>

<style lang="less" scoped>

</style>