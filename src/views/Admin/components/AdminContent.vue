<template>
  <div class="content">
    <el-table
    :data="tableData"
    highlight-current-row
    @sort-change='sortChange'
    v-loading="listLoading"
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
        min-width="150"
        sortable='custom'>
      </el-table-column>
      <el-table-column
        label="名字"
        prop="name"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="地址"
        prop="addr"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="email"
        prop="email"
        min-width="300">
      </el-table-column>
      <!-- <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AdminContent extends Vue{
  @Prop() private tableData!: Array<object>
  @Prop() private listLoading!: Boolean

  public sortChange(column) {
    let { prop, order } = column
    if (order === 'descending') {
      this.tableData.sort((a, b) => b["id"] - a["id"])
    } else {
      this.tableData.sort((a, b) => a["id"] - b["id"])
    }
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