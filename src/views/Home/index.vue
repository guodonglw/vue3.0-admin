<template>
  <div class="ctn">
    <!-- 头部 -->
    <div class="ctnHead">
      <head-bar @getHeadData="getHeadData"></head-bar> 
    </div>

    <!-- 内容主体 -->
    <div class="ctnBody">
      <!-- 侧边栏 -->
      <nav-bar :isFold="isFold"></nav-bar>
      <!-- 内容 -->
      <div class="ctnBodyContent">
        <div :class="['ctnBodyTitle', {'ctnBodyTitleFold': isFold}]">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item ><strong>{{$route.name}}</strong></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="childContent">
          <router-view></router-view>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import HeadBar from './components/HeadBar'
import NavBar from './components/NavBar'
export default {
  components: {
    HeadBar,
    NavBar
  },

  data() {
    return {
      isFold: false
    }
  },

  methods: {
    getHeadData(val) {
      this.isFold = val
    }
  }
}
</script>

<style lang="less">
.ctn {
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  font-size: 1.5rem;
  overflow-x: auto;
  overflow-y: hidden;
  &Head {
    height: 50px;
  }
  &Body {
    flex: 1 0 auto;
    // border: 2px solid blue;
    display: flex;
    height: 100%;
    flex-flow: row nowrap;

    &Content {
      flex: 1 1 auto;
      height: 100%;
      padding: 10px;
      // border: 2px solid blue;
      background-color: #f0f2f5;
      overflow: auto;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    &Title {
      width: 100%;
      position: fixed;
      top: 55px;
      left: 205px;
      z-index: 1;

      &Fold {
        left: 80px;
      }
    }
  }
}

.childContent {
  width: 97%;
  height: 100%;
}

.el-dialog {
  width: 30%;
  min-width: 380px;
}
</style>