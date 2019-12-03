<template>
  <div class="chart">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="chartTab">
      <el-tab-pane label="折线图" name="line" class="chartTabItem">折线图</el-tab-pane>
      <el-tab-pane label="柱状图" name="bar" class="chartTabItem">柱状图</el-tab-pane>
      <el-tab-pane label="饼图" name="pie" class="chartTabItem">饼图</el-tab-pane>
    </el-tabs>

    <div class="chartContent">
      <line-chart v-if="showLine" :id="'lineChart'" :width="'100%'" :height="'100%'"></line-chart>
      <bar-chart v-if="showBar" :id="'barChart'" :width="'100%'" :height="'100%'"></bar-chart>
    </div>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'

export default {
  components: {
    LineChart,
    BarChart
  },

  data() {
    return {
      activeName: 'line'
    }
  },

  computed: {
    showLine: function() {
      return this.activeName == 'line'
    },
    showBar: function() {
      return this.activeName == 'bar'
    },
    showPie: function() {
      return this.activeName == 'pie'
    }
  },

  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>

<style lang="less" scoped>
.chart {
  width: 100%;
  height: 85%;
  margin: 20px 0;
  border: 1px solid rgba(173,216,230, 1);
  background-color: #fff;
  display: flex;
  flex-flow: column nowrap;

  &Tab {
    // border: 1px solid blue;
    // height: 5%;
    flex: 0 0 5%;

    &Item {
      height: 0;
    }
  }

  &Content {
    width: 100%; 
    flex: 1 1 90%;
    margin: 5px 0 0 0;
    // border: 2px solid blue;
  }
}
</style>