<template>
  <div :style="{width: width}" class="lineProgress">
    <el-progress :percentage="percentage" :color="customColorMethod"></el-progress>
    <div>
      <el-button-group>
        <el-button icon="el-icon-minus" @click="DecreasePercentage(10)"></el-button>
        <el-button icon="el-icon-plus" @click="IncreasePercentage(10)"></el-button>
      </el-button-group>
    </div>
  </div> 
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action } from 'vuex-class'

@Component
export default class LineProgress extends Vue{
  @Prop() width !: string
  // 根据percentage的数值进行颜色变化
  customColorMethod = [
    {color: '#f56c6c', percentage: 20},
    {color: '#e6a23c', percentage: 40},
    {color: '#5cb87a', percentage: 60},
    {color: '#1989fa', percentage: 80},
    {color: '#6f7ad3', percentage: 100}
  ]

  @State(state => state.app.percentage) percentage !: number
  @Action('app/IncreasePercentage') IncreasePercentage !: Function
  @Action('app/DecreasePercentage') DecreasePercentage !: Function
}
</script>

<style lang="less" scoped>
.lineProgress {
  min-width: 200px;
  line-height: 100px;
  border: 2px solid rgba(173,216,230, 0.6);
  padding: 20px;
}
</style>
