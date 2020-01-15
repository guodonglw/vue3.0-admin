<template>
  <el-dialog title="编辑账号" :visible.sync="dialogFormVisible" v-dialogDrag width="25%">
    <el-form :model="form">
      <el-form-item label="账号ID" :label-width="formLabelWidth">
        <el-input v-model="form.id" autocomplete="off" class="formItem" placeholder="请输入账号id" disabled></el-input>
      </el-form-item>
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" class="formItem" placeholder="请输入账号名称"></el-input>
      </el-form-item>
      <el-form-item label="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off" class="formItem" placeholder="请输入邮箱"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="dialogFormVisible = false" >取 消</el-button>
      <el-button size="medium" type="primary" @click="editAdmin" :loading="loading">编辑</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import service from '@/service/index'

interface Edit {
  form: Object
  formLabelWidth: String
  dialogFormVisible: Boolean
  loading: Boolean
}

@Component
export default class AddAdmin extends Vue implements Edit{
  @Prop() private editVisible!: Boolean
  @Prop() private row !: Object

  formLabelWidth = '120px'
  dialogFormVisible = this.editVisible
  loading = false

  // 该处代码使用了侦听器，修改为计算属性更加合理
  @Watch('editVisible')
  onVisibleChange(val: Boolean, oldVal: Boolean) {
    this.dialogFormVisible = val
  }

  @Watch('dialogFormVisible')
  onDialogFormVisibleChange(val: Boolean, oldVal: Boolean) {
    if (!val) {
      this.$emit('getChildData', val)
    }
  }

  // 计算属性，拿到要修改的数据
  get form() {
    return this.row
  }

  // 编辑数据并修改
  public editAdmin() {
    let params = this.form
    this.loading = true
    service.putAdminList(params).then(res => {
      this.loading = false
      this.dialogFormVisible = false
      let { code, msg } = res.data
      if (code == 0) {
        this.$message({
          message: msg,
          type: 'success'
        })
      }
      this.$emit('flushList')  // 修改后刷新数据
    }) 
  }
}
</script>

<style lang="less" scoped>
.formItem {
  width: 200px;
  float: left
}
</style>