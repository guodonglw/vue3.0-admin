<template>
  <div class="error">
    <img src="@/assets/404.gif" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '404 not found'
    }
  }
}
</script>

<style lang="less" scoped>
.error {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 5;
  top: 0px;
  left: 0px;
  overflow: hidden;
  background-color: #fff;
}
</style>