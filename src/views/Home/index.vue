<template>
  <div class="ctn">
    <!-- 头部 -->
    <div class="ctnHead">
      <head-bar></head-bar> 
    </div>

    <!-- 内容主体 -->
    <div class="ctnBody">
      <!-- 侧边栏 -->
      <nav-bar></nav-bar>
      <!-- 内容 -->
      <div class="ctnBodyContent">
        <div :class="['ctnBodyContentTitle', {'ctnBodyContentTitleFold': isFold}]">    
          <el-breadcrumb separator="/" style="float: left; margin-right: 30px; line-height: 20px">
            <el-breadcrumb-item><strong>{{$route.name}}</strong></el-breadcrumb-item>
          </el-breadcrumb>   
          <el-tag
            id="routerTag"
            :key="tag.path"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            type='warning'
            size="small"
            @click="handleClick(tag)"
            @close="handleClose(tag)">
            {{tag.name}}
          </el-tag>
          
        </div>
        <div class="childContent">
          <router-view v-if="isRouterAlive"></router-view>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import HeadBar from './components/HeadBar'
import NavBar from './components/NavBar'
import { mapGetters } from 'vuex'

export default {
  components: {
    HeadBar,
    NavBar
  },

  // 点击页面侧边栏实现重载页面
  provide() {
    return {
      reload: this.reload
    }
  },

  computed: {
    isFold() {
      return this.$store.state.app.isFold
    },
    dynamicTags() {
      let routerPaths = this.$store.state["app"]
      routerPaths = routerPaths["routerPaths"]
      routerPaths = routerPaths.split("_").map(item => JSON.parse(item))
      return routerPaths
    }
  },

  data() {
    return {
      isRouterAlive: true
    }
  },

  methods: {
    // 页面重载函数
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        setTimeout(() => {
          this.isRouterAlive = true
        }, 300)   
      })
    },

    // 点击tab跳转到对应页面
    handleClick(tag) {
      this.$router.push({path: tag.path})
    },

    // 关闭tab标签
    handleClose(tag) {
      this.$store.dispatch('RemoveRouter', tag)
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

      &Title {
        width: 100%;
        position: fixed;
        top: 55px;
        left: 205px;
        z-index: 1;
        // border: 1px solid red;

        &Fold {
          left: 80px;
        }
      }
    }
  }
}

.childContent {
  margin-top: 25px;
  width: 97%;
  height: 100%;
}

#routerTag {
  float: left;
  border: 1px solid rgba(30,144,255,0.3)
}

.el-dialog {
  width: 25%;
  min-width: 380px;
}
</style>