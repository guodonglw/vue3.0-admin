<template>
  <div :style="{width: width}" class="lineProgress">
    <el-progress :percentage="percentage" type="circle" :status="status"></el-progress>
  </div> 
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action } from 'vuex-class'

@Component
export default class CircleProgress extends Vue{
  @Prop() width !: string
  // 计算属性
  get status() {
    return this.percentage == 100 ? 'success' : 'exception'
  }

  @State(state => state.app.percentage) percentage !: number
}
</script>

<style lang="less" scoped>
.lineProgress {
  min-width: 200px;
  height: 100px;
  border: 2px solid rgba(173,216,230, 0.6);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
