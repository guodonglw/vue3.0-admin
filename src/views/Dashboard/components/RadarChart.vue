<template>
  <div id="radarChart" style="width:100%; height:300px;"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Echarts from 'echarts'
import myMixins from '../mixins/resize'

@Component({
  mixins:[myMixins]
})
export default class LineChart extends Vue{
  chart: any
  __resizeHandler: any

  public drawChart(): void {
    this.chart = Echarts.init(<any>document.getElementById('radarChart'))
    this.chart.setOption({
      tooltip:{},
      legend: {
        data: ['预算分配', '实际开销'],
      },
      grid:{top:'25%',left:'25%',right:'25%',bottom:'25%'},
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5],
          }
        },
        radius: '60%',
        indicator: [
          { name: '销售', max: 6500},
          { name: '管理', max: 16000},
          { name: '信息技术', max: 30000},
          { name: '客服', max: 38000},
          { name: '研发', max: 52000},
          { name: '市场', max: 25000}
        ]
      },
      series: [{
        name: '预算 vs 开销',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [{
          value : [4300, 10000, 28000, 35000, 50000, 19000],
          name : '预算分配'
        },
        {
          value : [5000, 14000, 28000, 31000, 42000, 21000],
          name : '实际开销'
        }]
      }]
    })
  }

  private mounted() {
    this.drawChart()
  }
}
</script>

<style lang="less" scoped>

</style>