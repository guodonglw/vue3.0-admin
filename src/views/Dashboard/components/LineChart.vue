<template>
  <div id="chartLine" style="width:100%; height:400px;"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import myMinxis from '../mixins/resize'
declare let echarts: any;

@Component({
  mixins:[myMinxis]
})
export default class LineChart extends Vue{
  chart: any
  __resizeHandler: any

  public drawChart(): void {
    this.chart = echarts.init(document.getElementById('chartLine'));
    this.chart.setOption({
      title: {
        text: '数据趋势图'
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data:['实际情况','理想']
      },
      grid: {
        left: 10,
        right: 10,
        bottom: 20,
        top: 50,
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
          animationDuration: 2800,
          animationEasing: 'cubicInOut',
          data: [100, 120, 161, 134, 105, 160, 165]
        },
        {
          name:'理想',
          type:'line',
          itemStyle: {
            normal: {
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          smooth: true,
          animationDuration: 2800,
          animationEasing: 'quadraticOut',
          data:[120, 82, 91, 154, 162, 140, 145]
        }
      ]
    })
  }

  private mounted() {
    this.drawChart()
  }
}
</script>

<style lang="less" scoped>

</style>