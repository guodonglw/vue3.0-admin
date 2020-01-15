<template>
  <div :style="{width: width}" class="updateVuex">
    <el-form>
      <el-form-item label="输入进度条百分比" >
        <el-input v-model="percentageNow" autocomplete="off" class="formItem" placeholder="请输入进度条百分比"></el-input>
      </el-form-item>
      <el-form-item label="侧边导航栏折叠" >
        <el-radio-group v-model="isFoldNow" class="formItem" style="width: auto; margin-top: 13px">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" type="primary" @click="activeProgress">动态效果</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action } from 'vuex-class'

@Component
export default class UpdateVuex extends Vue{
  @Prop() width !: string
  percentageNow:number = 0
  isFoldNow: Boolean = false
  
  // 获取vuex的state及action
  @State(state => state.app.percentage) percentage !: number
  @State(state => state.app.isFold) isFold !: boolean
  @Action('app/UpdateIsFold') UpdateIsFold !: Function
  @Action('app/SetPercentage') SetPercentage !: Function

  @Watch('isFoldNow')
  onIsFoldNowChanged(val) {
    this.UpdateIsFold(val)
  }

  @Watch('percentageNow')
  onPercentageNow(val) {
    let newVal = Number(val) || 0
    this.SetPercentage(newVal)
    if (val > 100) {
      this.percentageNow = 100
    }
  }

  @Watch('percentage')
  onPercentage(val) {
    this.percentageNow = val
  }

  // 定时增加percentage
  public activeProgress() {
    let interval = setInterval(() => {
      if (this.percentageNow > 99) {
        clearInterval(interval)
        this.percentageNow = 99
      }
      this.percentageNow++
    }, 20)
  }

  private created() {
    this.percentageNow = this.percentage
    this.isFoldNow = this.isFold
  }
}
</script>

<style lang="less" scoped>
.updateVuex {
  min-width: 200px;
  border: 2px solid rgba(173,216,230, 0.6);
  padding: 20px;
}

.formItem {
  width: auto;
  float: left;
}
</style>