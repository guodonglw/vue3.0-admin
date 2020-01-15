<template>
  <div class="icon">
    <!-- tab标签 -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="iconTab">
      <el-tab-pane label="ElementIcom" name="element" class="iconTabItem"></el-tab-pane>
      <el-tab-pane label="FontAwesome" name="fontawesome" class="iconTabItem"></el-tab-pane>
    </el-tabs>

    <!-- 用于存放icon的空间 -->
    <div class="iconContent">
      <element-icon v-if="activeName=='element'"></element-icon>
      <font-awesome v-if="activeName=='fontawesome'"></font-awesome>
    </div>

    <div class="block"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ElementIcon from './components/ElementIcon.vue'
import FontAwesome from './components/FontAwesome.vue'

@Component({
  components: { ElementIcon, FontAwesome }
})
export default class Icon extends Vue{
  activeName = 'element'

  public handleClick() {

  }
}
</script>

<style lang="less" scoped>
.icon {
  width: 100%;
  min-height: 85%;
  margin: 20px 0;
  border: 1px solid rgba(173,216,230, 1);
  background-color: #fff;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;

   &Tab {
    flex: 0 0 5%;

    &Item {
      height: 0;
    }
  }

  &Content {
    width: 100%; 
    flex: 1 1 90%;
    margin: 5px 0 0 0;
    // border: 2px solid blue;
  }
}

.block {
  flex: 0 0 50px;
}
</style>