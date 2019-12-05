<template>
  <div :id="id" :style="{width: width, height: height}"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import myMixins from '../mixins/resize'
import echarts from 'echarts'
import 'echarts/lib/CoordinateSystem'

@Component({
  mixins: [myMixins]
})
export default class LineChart extends Vue{
  @Prop() private id !: string
  @Prop() private width !: String 
  @Prop() private height !: String 

  public initChart() {
    this.chart = echarts.init(<HTMLDivElement | HTMLCanvasElement>document.getElementById(this.id))
    
    var cellSize = [80, 80];
    var pieRadius = 30;

    function getVirtulData() {
      var date = +echarts['number'].parseDate('2017-02-01');
      var end = +echarts['number'].parseDate('2017-03-01');
      var dayTime = 3600 * 24 * 1000;
      var data:Array<any> = [];
      for (var time = date; time < end; time += dayTime) {
        data.push([
          echarts['format'].formatTime('yyyy-MM-dd', time),
          Math.floor(Math.random() * 10000)
        ]);
      }
      return data;
    }

    function getPieSeries(scatterData, chart) {
      return echarts['util'].map(scatterData, function (item, index) {
        var center = chart.convertToPixel('calendar', item);
        return {
          id: index + 'pie',
          type: 'pie',
          center: center,
          label: {
            normal: {
              formatter: '{c}',
              position: 'inside'
            }
          },
          radius: pieRadius,
          data: [
            {name: '工作', value: Math.round(Math.random() * 24)},
            {name: '娱乐', value: Math.round(Math.random() * 24)},
            {name: '睡觉', value: Math.round(Math.random() * 24)}
          ]
        };
      });
    }

    function getPieSeriesUpdate(scatterData, chart) {
      return echarts['util'].map(scatterData, function (item, index) {
        var center = chart.convertToPixel('calendar', item);
        return {
          id: index + 'pie',
          center: center
        };
      });
    }
    var scatterData = getVirtulData();

    var option = {
      backgroundColor: '#344b58',
      title: {
        text: '每日生活',
        x: '20',
        top: '20',
        textStyle: {
          color: '#fff',
          fontSize: '22'
        }
      },
      tooltip : {},
      legend: {
        data: ['工作', '娱乐', '睡觉'],
        bottom: 20
      },
      calendar: {
        top: 'middle',
        left: 'center',
        orient: 'vertical',
        cellSize: cellSize,
        yearLabel: {
          show: false,
          textStyle: {
            fontSize: 30
          }
        },
        dayLabel: {
          margin: 20,
          firstDay: 1,
          nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        },
        monthLabel: {
          show: false
        },
        range: ['2017-02']
      },
      series: [{
        id: 'label',
        type: 'scatter',
        coordinateSystem: 'calendar',
        symbolSize: 1,
        label: {
          normal: {
            show: true,
            formatter: function (params) {
              return echarts['format'].formatTime('dd', params.value[0]);
            },
            offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
            textStyle: {
              color: '#000',
              fontSize: 14
            }
          }
        },
        data: scatterData
      }]
    };

    var pieInitialized;
    
    setTimeout(() => {
        pieInitialized = true;
        this.chart.setOption(option)
        this.chart.setOption({
            series: getPieSeries(scatterData, this.chart)
        });
    }, 10);

    window.onresize = () => {
      setTimeout(() => {
        if (pieInitialized) {
          this.chart.setOption({
            series: getPieSeriesUpdate(scatterData, this.chart)
          });
        } 
      }, 100)   
    };
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