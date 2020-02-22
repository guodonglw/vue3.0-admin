<template>
  <div class="head">
    <div v-if="!isFold" class="headStart">
      {{name}}
    </div>
    <div v-else class="headStartFold">
      <i class="el-icon-platform-eleme"></i>
    </div>

    <div class="headMiddle">
      <i class="el-icon-s-fold" @click="handleFold" v-if="!isFold"></i>
      <i class="el-icon-s-unfold" @click="handleFold" v-else></i>
    </div>

    <div class="headEnd">
      <el-dropdown>
        <span>
          <p class="headEndCtx">
            <span v-html="admin">{{admin}}</span>
            <el-avatar :src="avatarUrl" :alt="'头像'"></el-avatar>
            <i class="el-icon-caret-bottom el-icon--right" style="font-size:15px; height: 1px"></i>
          </p>
        </span>      
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="dialogVisible = true">编辑</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <head-edit :dialogVisible="dialogVisible" :avatarUrl="avatarUrl" @changeAvatar="changeAvatar" @closeDialog="closeDialog"></head-edit>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action } from 'vuex-class'
import HeadEdit from './HeadEdit/HeadEdit.vue'

@Component({
  components: {HeadEdit}
})
export default class HeadBar extends Vue {
  name: string = "后台系统"
  avatarUrl: string = require('@/assets/avatar/avatar.jpg')
  dialogVisible: boolean = false

  // vuex数据
  @State(state => state.app.isFold) isFold!: boolean
  @Action('app/UpdateIsFold') UpdateIsFold!: Function

  // 计算属性
  get admin() {
    return sessionStorage.getItem('name') ? sessionStorage.getItem('name') + '&nbsp&nbsp' : 'admin'
  }

  // 与vue2中的methods部分中的function相似（该处这样实现）
  public logOut () {
    this.$router.push({name: 'login'})
  }

  public handleFold() {
    this.UpdateIsFold(!this.isFold)
  }

  // 修改头像（获得修改后头像地址）
  public changeAvatar(newAvatar) {
    this.avatarUrl = newAvatar
  }

  // 关闭编辑对话框，用于同步父子组件状态
  public closeDialog(val) {
    this.dialogVisible = val
  }
}

</script>

<style scoped lang="less">
.head {
  width: 100%;
  height: 50px;
  display: flex;
  flex-flow: row nowrap;
  line-height: 50px;
  // background-color: #20B2AA;
  background-image: linear-gradient(to right,rgba(0,128,128, 0.8), rgba(255,248,220, 1));

  &Start {
    width: 198px;
    font-weight: bold;
    border-right: 2px solid #2F4F4F;     
    background-image:-webkit-linear-gradient(left,	#FFD700,#FFF8DC); 
    -webkit-background-clip:text; 
    -webkit-text-fill-color:transparent; 
  }

  &StartFold {
    width: 62px;
    border-right: 2px solid #2F4F4F;  
  }

  &Middle {
    flex: 1 0 auto;

    i {
      float: left; 
      line-height: 50px;
      margin-left: 10px;
    }
  }

  &End {
    width: 200px;
    border-left: 2px solid black;

    &Ctx {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      font-weight: bold;
      width: 100%;
      // border: 1px solid yellow;

      img {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        background-image: linear-gradient(to right, rgba(0,255,255,0.4), rgba(0,206,209,1));       
      }
    }
  }
}
</style>