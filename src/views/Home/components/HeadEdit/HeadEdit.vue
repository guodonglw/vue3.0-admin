<template>
  <el-dialog title="编辑功能" :visible.sync="visible" v-dialogDrag width="25%">
    <el-form ref="form">
      <el-form-item label="头像" :label-width="labelWidth">
        <el-upload
          class="avatar-uploader formItem"
          action="https://www.baidu.com"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload">
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar" alt="头像">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button size="medium" type="primary" @click="visible = false" >取 消</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class HeadEdit extends Vue{
  @Prop() dialogVisible !: boolean
  @Prop() avatarUrl !: string

  visible: boolean = false
  labelWidth: string = '120px'

  @Watch('visible')
  onVisibleChanged(val) {
    if (!val) {
      this.$emit('closeDialog', val)
    }
  }

  @Watch('dialogVisible')
  onDialogVisibleChanged(val) {
    this.visible = val
  }

  public handleAvatarSuccess(res, file) {
    let newAvatar = 'https://img.51miz.com/Element/00/58/55/76/3193608e_E585576_5585f100.png!/quality/90/unsharp/true/compress/true/format/png/fh/630'  // 该处仅用于模拟功能，实际开发需换成真实url
    this.$emit('changeAvatar', newAvatar)
    this.$message.info('该处仅用于模拟该功能实现!')
  }

  public handleAvatarError(res) {
    let newAvatar = 'https://img.51miz.com/Element/00/58/55/76/3193608e_E585576_5585f100.png!/quality/90/unsharp/true/compress/true/format/png/fh/630'  // 该处仅用于模拟功能，实际开发需换成真实url
    this.$emit('changeAvatar', newAvatar)
    this.$message.info('该处仅用于模拟该功能实现!')
  }

  public beforeAvatarUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG 格式!');
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!');
    }
    return isJPG && isLt2M;
  }

  private created() {
    this.visible = this.dialogVisible
  }
}
</script>

<style lang="less" scoped>
.formItem {
  width: 200px;
  float: left;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: rgb(153, 64, 255);
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border-radius: 100px;
  border: 1px solid rgba(173,216,230, 1);
}

.avatar {
  width: 120px;
  height: 120px;
  display: block;
  border-radius: 100px;
  border: 1px solid rgba(173,216,230, 1);
}
</style>