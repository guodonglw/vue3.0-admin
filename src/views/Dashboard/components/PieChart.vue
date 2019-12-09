<template>
  <div id="pieChart" style="width:100%; height:300px;"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import myMixins from '../mixins/resize'
declare let echarts: any;

@Component({
  mixins:[myMixins]
})
export default class LineChart extends Vue{
  chart: any
  __resizeHandler: any

  public drawChart(): void {
    this.chart = echarts.init(document.getElementById('pieChart'));
    this.chart.setOption({
      title : {
        text: '用户访问来源',
        subtext: '纯属虚构',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
      },
      series : [
        {
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
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