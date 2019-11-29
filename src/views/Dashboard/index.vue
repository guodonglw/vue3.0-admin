<template>
  <div class="dash">
    <div class="dashRow">
      <div class="dashRowItem">新增账号：{{role}}</div>
      <div class="dashRowItem">新增用户：{{user}}</div>
      <div class="dashRowItem">新增商品：{{product}}</div>
      <div class="dashRowItem">预留</div>
    </div>

    <div class="dashRow">
      <div class="dashRowMiddle">
        <line-chart></line-chart>
      </div>
    </div>

    <div class="dashRow">
      <div class="dashRowGraph">
        <radar-chart></radar-chart>
      </div>
      <div class="dashRowGraph">
        <pie-chart></pie-chart>
      </div>
      <div class="dashRowGraph">
        <bar-chart></bar-chart>
      </div>
    </div>

    <div class="dashBlock"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import LineChart from './components/LineChart.vue'
import RadarChart from './components/RadarChart.vue'
import PieChart from './components/PieChart.vue'
import BarChart from './components/BarChart.vue'

@Component({
  components: { 
    LineChart,
    RadarChart,
    PieChart,
    BarChart
  }
})
export default class DashBoard extends Vue {
  role: Number = 123
  user: Number = 123456
  product: Number = 123456
  chartLine: any
}
</script>

<style lang="less" scoped>
.dash {
  width: 100%;
  // border: 2px solid blue;
  // height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  margin: 30px auto;
  font-size: 2rem;

  &Row {
    width: 100%;
    margin-bottom: 40px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    // border: 2px solid red;

    &Item {
      width: 24%;
      height: 100px;
      line-height: 100px;
      overflow: auto;
      background-color:	white;
      box-shadow: 2px 2px 4px rgba(0,0,0,.5);
      border-color: rgba(0,0,0,.05);
    }

    &Middle {
      width: 100%;
      background-color:	white;
      box-shadow: 2px 2px 4px rgba(0,0,0,.5);
      border-color: rgba(0,0,0,.05);
    }

    &Graph {
      width: 30%;
      padding: 15px;
      background-color: white;
      box-shadow: 2px 2px 4px rgba(0,0,0,.5);
      border-color: rgba(0,0,0,.5);
    }
  }

  &Block {
    flex: 0 0 50px;
  }
}
</style>