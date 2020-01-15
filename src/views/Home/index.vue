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
        <div :class="['ctnBodyContentTitle', {'ctnBodyContentTitleFold': isFold}, 'easeInOut']">    
          <el-breadcrumb separator="/" class="breadCrumb">
            <el-breadcrumb-item><strong>{{$route.name}}</strong></el-breadcrumb-item>
          </el-breadcrumb>   
          <el-tag
            id="routerTag"
            :key="tag.path"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            style="cursor:pointer"
            type='warning'
            size="small"
            @click="handleClick(tag)"
            @close="handleClose(tag)">
            {{tag.name}}
          </el-tag>        
        </div>
        <!-- 该部分为主要数据展示 -->
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

  // 点击页面侧边栏实现重载页面（尽量减少这种写法，不利于后面项目维护）
  provide() {
    return {
      reload: this.reload
    }
  },

  computed: {
    isFold() {
      return this.$store.state.app.isFold
    },
    // 动态生成tag标签
    dynamicTags() {
      let routerPaths = this.$store.state["app"]
      routerPaths = routerPaths["routerPaths"]
      routerPaths = routerPaths.split("_").map(item => JSON.parse(item))  // vuex中存储的routerPaths为序列化后结果，该处需反序列化
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
      this.$store.dispatch('app/RemoveRouter', tag)
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
      // position: relative;

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

.easeInOut {
  -webkit-transition: all 1s ease-in-out ;
  -moz-transition: all 1s ease-in-out ;
  -o-transition: all 1s ease-in-out ;
  transition: all 1s ease-in-out ;
}

.childContent {
  margin-top: 25px;
  width: 97%;
  height: 100%;
}

.breadCrumb {
  float: left; 
  margin-right: 30px; 
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