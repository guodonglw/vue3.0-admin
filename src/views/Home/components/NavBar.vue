<template>
  <div :class="isFold ? 'navFold' : 'nav'">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo navMenu"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      background-color="#2F4F4F"
      text-color="#FFF"
      active-text-color="#ffd04b"
      unique-opened
      router>
      <template v-for="(item, index) in $router.options.routes">
        <!-- 不折叠导航栏 -->
        <el-submenu :index="index+''" v-if="!isFold && !item.hidden && !item.leaf" :key="index" class="navSub">
          <template slot="title">
            <i :class="item.iconCls"></i>
            <span>{{item.name}}</span>
          </template>
          <template v-for="child in item.children">
            <el-menu-item :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item v-if="!isFold && item.leaf && item.children.length>0" :index="item.children[0].path" :key="item.children[0].path" class="navSub">
          <i :class="item.iconCls"></i>
          <span>{{item.children[0].name}}</span>
        </el-menu-item>

        <!-- 折叠导航栏 -->
        <el-menu-item v-if="isFold && item.leaf && item.children.length>0" :index="item.children[0].path" :key="item.children[0].path" class="navSub">
          <i :class="item.iconCls"></i>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
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
.nav {
  flex: 0 0 200px;
  height: 100%;
  background-color: #2F4F4F;
  // border: 2px solid red;

  &Menu {
    width: 100%;
  }

  &Sub {
    border-bottom: 1px solid #AFEEEE;
    text-align: left;
  }
}

.navFold {
  flex: 0 0 50px;
  height: 100%;
  background-color: #2F4F4F;
  // border: 2px solid red;

  &Menu {
    width: 100%;
  }

  &Sub {
    border-bottom: 1px solid #AFEEEE;
    text-align: left;
  }
}
</style>