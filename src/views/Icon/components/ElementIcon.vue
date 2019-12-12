<template>
  <div class="elementIcon">
    <div v-for="(item,index) in elementIcons" :key="index">
      <el-tooltip placement="top">
        <div slot="content">
          {{generateElementIcon(item)}}
        </div>
        <div class="elementIconItem">
          <i :class="'el-icon-' + item"></i>
          <span>{{item}}</span>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Icons from '../icons'

interface IconData {
  elementIcons: Array<string>
}

@Component
export default class Icon extends Vue{
  elementIcons = Icons['elementIcons']

  public generateElementIcon(symbol) {
    return `<i class="el-icon-${symbol}" />`
  }
}
</script>

<style lang="less" scoped>
.elementIcon {
  width: 100%;
  margin: 20px 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;

  &Item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
    // border: 1px solid red;
    background-image: linear-gradient(to right,rgba(0,206,209, 0.2) , rgba(0,255,255, 0.2));

    i {
      margin-top: 10px;
    }

    span {
      display: block;
      font-size: 16px;
      margin: 10px auto;
    }
  }
}
</style>