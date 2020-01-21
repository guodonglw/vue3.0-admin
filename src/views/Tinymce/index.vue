<template>
  <div class="tiny">
    <!-- 标题 -->
    <h2>{{ msg }}</h2>
    <!-- 富文本编辑器组件 -->
    <tinymce-editor ref="editor"
      class="tinyEditor"
      :value="msg"
      :disabled="disabled"
      @onClick="onClick">
    </tinymce-editor>
    <!-- 功能按钮 -->
    <div class="tinyFooter">
      <el-button type="primary" size="medium" plain @click="clear">清空内容</el-button>
      <el-button type="info" size="medium" plain @click="disabled = !disabled">禁用</el-button>
    </div>   
  </div>
</template>

<script>
import TinymceEditor from '@/components/TinymceEditor'
export default {
  components: {
    TinymceEditor
  },
  data () {
    return {
      msg: 'Welcome to Use Tinymce Editor',
      disabled: false
    }
  },
  methods: {
    // 鼠标单击的事件
    onClick (e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
    // 清空内容
    clear () {
      this.$refs.editor.clear()
    }
  }
}
</script>

<style lang="less" scoped>
.tiny {
  width: 100%;
  min-height: 85%;
  margin: 20px 0;
  border: 1px solid rgba(173,216,230, 1);
  background-color: #fff;
  overflow: auto;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  align-items: center;

  &Editor {
    width: 80%;
  }

  &Footer {
    width: 80%;
    // border: 1px solid red;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
  }
}
</style>