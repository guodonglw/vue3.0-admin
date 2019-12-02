<template>
  <!-- 导航栏 -->
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
    background-color="#2F4F4F"
    text-color="#FFF"
    active-text-color="#ffd04b"
    unique-opened
    :collapse="isFold"
    router>
    <template v-for="(item, index) in $router.options.routes">
      <!-- 二级菜单渲染 -->
      <el-submenu :index="index+''" v-if="!item.hidden && !item.leaf" :key="index" style="border-bottom: 1px solid red">
        <template slot="title">
          <i :class="item.iconCls"></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <template v-for="child in item.children">
          <el-menu-item :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
        </template>
      </el-submenu>
      <!-- 一级菜单渲染 -->
      <el-menu-item v-if="item.leaf && item.children.length>0" :index="item.children[0].path" :key="item.children[0].path">
        <i :class="item.iconCls"></i>
        <span slot="title">{{item.children[0].name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NavBar extends Vue {
  @Prop() private isFold !: boolean

  public handleOpen() {

  }

  public handleClose() {

  }

  public handleSelect() {
    
  }
}

</script>

<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-width: 200px;
  min-height: 400px;
  text-align: left;
}

.el-menu--collapse {
  width: 64px;
  min-width: 64px;
}

.el-menu-item {
  border-bottom: 2px solid rgba(	95,158,160, 0.5)
}
</style>