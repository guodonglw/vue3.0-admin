<template>
  <div class="head">
    <el-form ref="form" :model="form" label-width="auto" class="headForm" :inline="true">
      <el-form-item label="查询的账户ID">
        <el-input v-model="form.id" placeholder="查询的账户ID" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getAdmin" size="small" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="visible=true" size="small" icon="el-icon-plus">新增</el-button>
        <el-button :loading="downloadLoading" type="info" @click="handleDownloadExcel" size="small" icon="el-icon-document">导出Excel</el-button>
        <el-button :loading="downloadLoading1" type="info" @click="handleDownloadZip" size="small" icon="el-icon-takeaway-box">导出Zip</el-button>
      </el-form-item>
    </el-form>

    <add-admin :visible.sync='visible' @getAdmin='getAdmin'></add-admin>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import service from '@/service/index'
import AddAdmin from './AddAdmin/AddAdmin.vue'
import downloadMixins from '../mixins/download'

interface Admin {
  form: Object
  visible: Boolean
}

@Component({
  components: { AddAdmin },
  mixins: [downloadMixins]  // 混入下载为excel和zip的方法（handleDownloadExcel/handleDownloadZip）
})
export default class AdminHead extends Vue implements Admin{
  @Prop() private page !: number

  downloadData: Array<any> = []  // 该数据用于mixin中的方法调用（该处可不定义）

  form = {
    id: '',
  }

  visible = false  // 添加对话框是否可见
  
  // 请求table数据
  public getAdmin() {
    let params = Object.assign({}, this.form, {page: this.page })
    service.getAdminList(params).then(res => {
      this.downloadData = res.result['admins']
      this.$emit('getHeadData', res, false)
    })
  }

  private created() {
    this.getAdmin()
  }
}
</script>

<style lang="less" scoped>
.head {
  flex: 0 0 50px;
  width: 100%;
  margin: 10px 0;
  background-color:rgba(	176,196,222, 0.3);

  &Form {
    margin: 20px 10px 10px 10px;
    float: left;
  }
}

.el-form-item {
  margin-bottom: 10px;
}

</style>