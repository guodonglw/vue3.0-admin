<template>
  <div class="head">
    <el-form ref="form" :model="form" label-width="auto" class="headForm" :inline="true">
      <el-form-item label="查询的账户ID">
        <el-input v-model="form.id" placeholder="查询的账户ID" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getAdmin" size="small">查询</el-button>
        <el-button type="primary" @click="visible=true" size="small">新增</el-button>
      </el-form-item>
    </el-form>

    <add-admin :visible='visible' @getChildData='getChildData' @getAdmin='getAdmin'></add-admin>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import service from '@/service/index'
import AddAdmin from './AddAdmin/AddAdmin.vue'

interface Admin {
  form: Object
  visible: Boolean
}

@Component({
  components: { AddAdmin }
})
export default class AdminHead extends Vue implements Admin{
  @Prop() private page !: number

  form = {
    id: '',
  }

  visible = false  // 添加对话框是否可见
  
  // 请求table数据
  public getAdmin() {
    let params = Object.assign({}, this.form, {page: this.page })
    service.getAdminList(params).then(res => {
      this.$emit('getHeadData', res, false)
    })
  }

  // 接收子组件数据
  public getChildData(val) {
    this.visible = val
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