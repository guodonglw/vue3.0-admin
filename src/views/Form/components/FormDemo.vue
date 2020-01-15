<template>
  <!-- 该处为一个form表单示例 -->
  <el-form :inline="false" :model="ruleForm" :rules="rules" ref="ruleFormDemo" label-width="auto" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="name" >
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region" >
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="北京" value="北京"></el-option>
          <el-option label="上海" value="上海"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker type="date" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即创建</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Ref } from 'vue-property-decorator'
import { Form } from 'element-ui'
import util from '@/util/index'

@Component
export default class FormDemo extends Vue{
  @Ref('ruleFormDemo') readonly ruleFormDemo!:Form
  activities:Array<any> = []

  ruleForm = {
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: ''
  }
  rules = {
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    region: [
      { required: true, message: '请选择活动区域', trigger: 'change' }
    ],
    date1: [
      { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
    ],
    date2: [
      { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
    ],
    type: [
      { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
    ],
    resource: [
      { required: true, message: '请选择活动资源', trigger: 'change' }
    ],
    desc: [
      { required: true, message: '请填写活动形式', trigger: 'blur' }
    ]
  }

  deepClone(source) {
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = this.deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    })
    return targetObj
  }

  public submitForm() {
    this.ruleFormDemo.validate((valid) => {
      if (valid) {
        this.ruleForm['date3'] = util.formatDate(this.ruleForm['date2'])
        this.$emit('getFormData', this.deepClone(this.ruleForm))  // 该处有坑，必须深拷贝，否则TableData中数据会有问题
        // alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }

  public resetForm() {
    this.ruleFormDemo.resetFields();
  }
}
</script>

<style lang="less" scoped>
.demo-ruleForm {
  flex: 0 1 30%;
  min-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 2px solid rgba(173,216,230, 1);
}

.el-form-item {
  text-align: left;
}

.line {
  text-align: center;
  font-size: 30px;
}
</style>