<template>
  <div class="chart">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="chartTab">
      <el-tab-pane label="折线图" name="line" class="chartTabItem"></el-tab-pane>
      <el-tab-pane label="柱状图" name="bar" class="chartTabItem"></el-tab-pane>
      <el-tab-pane label="饼图" name="pie" class="chartTabItem"></el-tab-pane>
      <el-tab-pane label="仪表盘" name="dash" class="chartTabItem"></el-tab-pane>
      <el-tab-pane label="Gallery" name="gallery" class="chartTabItem"></el-tab-pane>
    </el-tabs>

    <div class="chartContent">
      <line-chart v-if="showLine" :id="'lineChart'" :width="'100%'" :height="'100%'"></line-chart>
      <bar-chart v-if="showBar" :id="'barChart'" :width="'100%'" :height="'100%'"></bar-chart>
      <pie-chart v-if="showPie" :id="'pieChart'" :width="'100%'" :height="'100%'"></pie-chart>
      <gallery-chart v-if="showGallery" :id="'galleryChart'" :width="'100%'" :height="'100%'"></gallery-chart>
      <dash-chart v-if="showDash" :id="'dashChart'" :width="'100%'" :height="'100%'"></dash-chart>
    </div>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import GalleryChart from './components/GalleryChart'
import DashChart from './components/DashChart'

export default {
  components: {
    LineChart,
    BarChart,
    PieChart,
    DashChart,
    GalleryChart
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
    },
    showGallery: function() {
      return this.activeName == 'gallery'
    },
    showDash: function() {
      return this.activeName == 'dash'
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