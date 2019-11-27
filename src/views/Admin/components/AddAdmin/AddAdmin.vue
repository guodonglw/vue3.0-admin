<template>
  <el-dialog title="添加账号" :visible.sync="dialogFormVisible" v-dialogDrag width="30%">
    <el-form :model="form">
      <el-form-item label="账号ID" :label-width="formLabelWidth">
        <el-input v-model="form.id" autocomplete="off" class="formItem" placeholder="请输入账号id"></el-input>
      </el-form-item>
      <el-form-item label="账号名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" class="formItem" placeholder="请输入账号名称"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.time"
          type="date"
          placeholder="选择日期"
          class="formItem">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="dialogFormVisible = false" >取 消</el-button>
      <el-button size="medium" type="primary" @click="addAdmin">添加</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import service from '@/service/index'

interface Add {
  form: Object
  formLabelWidth: String
  dialogFormVisible: Boolean
}

@Component
export default class AddAdmin extends Vue implements Add{
  @Prop() private visible!: Boolean

  form = {
    id: '',
    name: '',
    createdAt: ''
  }
  formLabelWidth = '120px'
  dialogFormVisible = this.visible

  @Watch('visible')
  onVisibleChange(val: Boolean, oldVal: Boolean) {
    this.dialogFormVisible = val
  }

  @Watch('dialogFormVisible')
  onDialogFormVisibleChange(val: Boolean, oldVal: Boolean) {
    if (!val) {
      this.$emit('getChildData', val)
    }
  }

  public addAdmin() {
    service.postAdminList(this.form).then(res => {
      this.dialogFormVisible = false
      this.$emit('getAdmin')
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