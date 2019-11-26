<template>
  <div class="content">
    <el-table
    :data="tableData"
    @sort-change='sortChange'
    border>
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="ID"
      prop="id"
      sortable='custom'>
    </el-table-column>
    <el-table-column
      label="名字"
      prop="name">
    </el-table-column>
    <el-table-column
      label="创建时间"
      prop="createdAt">
    </el-table-column>
    <el-table-column
      label="头像"
      prop="avatar">
    </el-table-column>
  </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AdminContent extends Vue{
  @Prop() private tableData!: Array<object | null>

  public sortChange(column, prop, order) {
    console.log(column,prop, order)
  }
}
</script>

<style lang="less" scoped>
.content {
  flex: 1 0 auto;
  border: 1px solid rgba(	176,196,222, 1);
  width: 100%;
  margin: 20px 0;
  overflow: auto;    
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.el-table {
  width: 100%;
  text-align: center
}
</style>