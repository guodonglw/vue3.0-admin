<template>
  <div class="dash">
    <el-row :gutter="20" class="dashRow">
      <el-col :span="6">
        <div class="dashRowItem">新增房间：{{room}}</div>
      </el-col>
      <el-col :span="6">
        <div class="dashRowItem">新增推流：{{push}}</div>
      </el-col>
      <el-col :span="6">
        <div class="dashRowItem">新增拉流：{{pull}}</div>
      </el-col>
      <el-col :span="6">
        <div class="dashRowItem">预留</div>
      </el-col>
    </el-row>

    <el-row class="dashRow">
      <div id="chartLine" style="width:100%; height:400px;"></div>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
declare let echarts: any;

@Component
export default class DashBoard extends Vue {
  room: Number = 123
  push: Number = 123456
  pull: Number = 123456
  chartLine: any

  public drawChart(): void {
      this.chartLine = echarts.init(document.getElementById('chartLine'));
      this.chartLine.setOption({
        title: {
            text: '折线图堆叠'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
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
                name:'邮件营销',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量',
                data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
                name:'搜索引擎',
                type:'line',
                stack: '总量',
                data:[820, 932, 901, 934, 1290, 1330, 1320]
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
.dash {
  width: 100%;
  // border: 2px solid blue;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  margin: 30px auto;
  font-size: 2rem;

  &Row {
    width: 100%;
    margin-bottom: 40px;
    background-color:rgba(245,245,220, 0.3);
    // border: 2px solid red;

    &Item {
      height: 100px;
      line-height: 100px;
      overflow: auto;
      background-color:	rgba(	255,228,196, 0.5);
    }
  }
}
</style>