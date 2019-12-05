<template>
  <div :id="id" :style="{width: width, height: height}"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import myMixins from '../mixins/resize'
declare let echarts: any;

@Component({
  mixins: [myMixins]
})
export default class LineChart extends Vue{
  @Prop() private id !: string
  @Prop() private width !: String 
  @Prop() private height !: String 

  public initChart() {
    this.chart = echarts.init(document.getElementById(this.id))
    this.chart.setOption({
      backgroundColor: '#344b58',
      title: {
        top: 20,
        text: 'Requests',
        textStyle: {
          fontWeight: 'normal',
          fontSize: 16,
          color: '#F1F1F3'
        },
        left: '1%'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#57617B'
          }
        }
      },
      legend: {
        top: 20,
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: ['移动', '联通', '电信'],
        right: '4%',
        textStyle: {
          fontSize: 12,
          color: '#F1F1F3'
        }
      },
      grid: {
        top: 100,
        left: '2%',
        right: '2%',
        bottom: '2%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#57617B'
          }
        },
        data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
      }],
      yAxis: [{
        type: 'value',
        name: '(%)',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#57617B'
          }
        },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 14
          }
        },
        splitLine: {
          lineStyle: {
            color: '#57617B'
          }
        }
      }],
      series: [{
        name: '移动',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 1
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(137, 189, 27, 0.3)'
            }, {
              offset: 0.8,
              color: 'rgba(137, 189, 27, 0)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(137,189,27)',
            borderColor: 'rgba(137,189,2,0.27)',
            borderWidth: 12

          }
        },
        data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
      }, {
        name: '联通',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 1
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(0, 136, 212, 0.3)'
            }, {
              offset: 0.8,
              color: 'rgba(0, 136, 212, 0)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(0,136,212)',
            borderColor: 'rgba(0,136,212,0.2)',
            borderWidth: 12

          }
        },
        data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
      }, {
        name: '电信',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 1
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(219, 50, 51, 0.3)'
            }, {
              offset: 0.8,
              color: 'rgba(219, 50, 51, 0)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(219,50,51)',
            borderColor: 'rgba(219,50,51,0.2)',
            borderWidth: 12
          }
        },
        data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
      }]
    })
  }

  private mounted () {
    this.initChart()
  }

  private beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  }
}
</script>