<template>
  <div class="dash">
    <div class="dashRow">
      <el-card class="dashRowItem" shadow="always">
        <p class="dashRowItemKey">C</p>
        <p class="dashRowItemTitle">新增数据</p>
        {{createData}}
      </el-card>
      <el-card class="dashRowItem" shadow="always">
        <p class="dashRowItemKey">R</p>
        <p class="dashRowItemTitle">读取数据</p>
        {{retreiveData}}
      </el-card>
      <el-card class="dashRowItem" shadow="always">
        <p class="dashRowItemKey">U</p>
        <p class="dashRowItemTitle">修改数据</p>
        {{updateData}}
      </el-card>
      <el-card class="dashRowItem" shadow="always">
        <p class="dashRowItemKey">D</p>
        <p class="dashRowItemTitle">删除数据</p>
        {{deleteData}} 
      </el-card>
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
  createData: string = "1,000,000"
  retreiveData: string = "2,000"
  updateData: string = "500"
  deleteData: string = "1,000"
  chartLine: any
}
</script>

<style lang="less" scoped>
.dash {
  width: 100%;
  // border: 2px solid blue;
  // height: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  align-items: center;
  margin: 30px auto;
  font-size: 1.5rem;

  &Row {
    width: 100%;
    margin-bottom: 40px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    // border: 2px solid red;

    &Item {
      width: 24%;
      text-align: left;
      line-height: 40px;
      border-radius: 10px;
      background-color:	white;
      box-shadow: 1px 1px 1px rgba(0,0,0,.3);
      border-color: rgba(0,0,0,.05);

      &Title {
        color: rgb(113, 125, 126)
      }

      &Key {
        width: 50px;
        height: 50px;
        float: right;
        color: rgba(100, 181, 246, 1);
        border-radius: 50px;
        text-align: center;
        line-height: 50px;
        border: 2px solid rgb(113, 125, 126);
        -webkit-transform: rotate(-30deg); 
        transform: rotate(-30deg);
        opacity: 0.5;
      }

      &Key:hover {
        transform:translateX(10px);
        width: 60px;
        height: 60px;
        border-radius: 60px;
        line-height: 60px;
        color: rgb(123, 31, 162);
        border: 2px solid rgb(142, 68, 173 );
        opacity: 1;
      }
    }

    &Middle {
      width: 100%;
      background-color:	white;
      padding: 15px;
      box-shadow: 1px 1px 1px rgba(0,0,0,.3);
      border-color: rgba(0,0,0,.05);
    }

    &Graph {
      width: 30%;
      padding: 10px;
      background-color: white;
      box-shadow: 1px 1px 1px rgba(0,0,0,.3);
      border-color: rgba(0,0,0,.5);
    }

    @media screen and (max-width:1000px) {
      &Item {
        width: 100%;
        margin: 10px 0;
      }

      &Graph {
        width: 100%;
        margin: 5px;
      }
    }
  }

  &Block {
    flex: 0 0 50px;
  }
}
</style>