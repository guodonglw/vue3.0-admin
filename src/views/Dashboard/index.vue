<template>
  <div class="dash">
    <el-row :gutter="20" class="dashRow">
      <el-col :span="6">
        <div class="dashRowItem">新增账号：{{role}}</div>
      </el-col>
      <el-col :span="6">
        <div class="dashRowItem">新增用户：{{user}}</div>
      </el-col>
      <el-col :span="6">
        <div class="dashRowItem">新增商品：{{product}}</div>
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
  role: Number = 123
  user: Number = 123456
  product: Number = 123456
  chartLine: any

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
            data:['视频广告','直接访问']
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
                name:'视频广告',
                type:'line',
                smooth: true,
                data:[500, 700, 650, 500, 400, 350, 500]
            },
            {
                name:'直接访问',
                type:'line',
                smooth: true,
                data:[500, 300, 250, 500, 750, 700, 500]
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