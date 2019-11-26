<template>
  <div class="head">
    <div class="headStart">
      {{name}}
    </div>

    <div class="headMiddle">

    </div>

    <div class="headEnd">
      <el-dropdown>
        <span>
          <p class="headEndCtx">
            <span v-html="admin">{{admin}}</span>
            <img src="../../../assets/logo.png"/>     
          </p>
        </span>      
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>编辑</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class HeadBar extends Vue {
  name: string = "后台系统"
  admin: string = 'test' + '&nbsp&nbsp'

  public logOut () {
    this.$router.push({name: 'login'})
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
  background-color: #20B2AA;
  background-image: linear-gradient(to right,rgb(255,248,220), #40E0D0);

  &Start {
    width: 198px;
    border-right: 2px solid #6495ED;     
    background-image:-webkit-linear-gradient(left,#00FA9A,#4169E1); 
    -webkit-background-clip:text; 
    -webkit-text-fill-color:transparent; 
  }

  &Middle {
    flex: 1 0 auto;
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