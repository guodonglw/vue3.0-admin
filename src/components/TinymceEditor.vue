<template>
  <div>
    <editor v-model="myValue"
      :init="init"
      :disabled="disabled"
      @onClick="onClick">
    </editor>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
// 编辑器插件plugins
import 'tinymce/plugins/image'// 插入上传图片插件
import 'tinymce/plugins/media'// 插入视频插件
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/wordcount'// 字数统计插件

@Component({
  components: {Editor}
})
export default class TinymceEditor extends Vue{
  @Prop() value !: string
  @Prop() disabled: Boolean = false

  @Watch('value')
  onValueChanged(val) {
    this.myValue = val
  }

  @Watch('myValue')
  onMyValueChanged(val) {
    this.$emit('input', val)
  }

  baseUrl: string = ''
  init: Object = {
    language_url: `${this.baseUrl}tinymce/langs/zh_CN.js`,
    language: 'zh_CN',
    skin_url: `${this.baseUrl}tinymce/skins/ui/oxide`,
    content_css: `${this.baseUrl}tinymce/skins/content/default/content.css`,
    // skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide-dark`, // 暗色系
    // content_css: `${this.baseUrl}/tinymce/skins/content/dark/content.css`, // 暗色系
    height: 300,
    plugins: 'lists image media table wordcount',
    toolbar: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat',
    branding: false,
    menubar: false,
    // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
    // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
    images_upload_handler: (blobInfo, success, failure) => {
      const img = 'data:image/jpeg;base64,' + blobInfo.base64()
      success(img)
    }
  }
  myValue = this.value

  public onClick(e) {
    this.$emit('onClick', e, tinymce)
  }

  public clear() {
    this.myValue = ''
  }

  private mounted() {
    tinymce.init({})
    this.baseUrl = process.env.BASE_URL
  }
}
</script>

<style lang="less" scoped>

</style>