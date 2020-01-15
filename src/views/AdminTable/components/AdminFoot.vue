<template>
  <div class="foot">
    <el-pagination
      background
      layout="total, prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AdminFoot extends Vue{
  @Prop() private total!: number
  pageSize:number = 15

  // 点击触发页码变化
  public handleCurrentChange(val) {
    let page = val
    this.$emit('getFootData', page, this.pageSize)
  }
}
</script>

<style lang="less" scoped>
.foot {
  flex: 0 0 50px;
  width: 100%;
  background-color:rgba(	176,196,222, 0.8);
}

.el-pagination {
  margin-top: 10px;
  float: right;
}
</style>