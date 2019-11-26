<template>
  <div class="ctn">
    <div class="ctnHead">
      <head-bar></head-bar> 
    </div>

    <div class="ctnBody">
      <nav-bar></nav-bar>
      <div class="ctnBodyContent">
        <div class="ctnBodyTitle">
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
    return {}
  }
}
</script>

<style scoped lang="less">
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
      flex: 1 0 auto;
      height: 100%;
      padding: 10px;
      // border: 2px solid blue;
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
    }
  }
}

.childContent {
  width: 97%;
  height: 100%;
}
 
</style>