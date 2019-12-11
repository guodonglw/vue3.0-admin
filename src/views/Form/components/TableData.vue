<template>
  <el-table
    :data="tableData"
    class="tableClass"
    :header-cell-style="{background:'rgba(255,218,185,0.4)',color:'#2F4F4F'}"
    empty-text="请在左侧创建数据"
    border>
    <el-table-column
      prop="name"
      label="活动名称"
      align="center">
    </el-table-column>
    <el-table-column
      prop="region"
      label="活动区域"
      align="center">
    </el-table-column>
    <el-table-column
      prop="date3"
      label="活动时间"
      align="center">
    </el-table-column>
    <el-table-column
      prop="type"
      label="活动性质"
      align="center">
    </el-table-column>
    <el-table-column
      prop="desc"
      label="活动形式"
      align="center">
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import util from '@/util/index'

@Component
export default class TableData extends Vue{
  @Prop() private tableData !: Array<any>
}
</script>

<style lang="less" scoped>
.tableClass {
  flex: 0 1 50%;
  min-width: 500px;
  border: 2px solid rgba(173,216,230, 1);
  margin: 50px auto;
}

.el-table {
  text-align: center
}
</style>