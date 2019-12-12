<template>
  <div class="fontIcon">
    <div v-for="(item,index) in fontIcons" :key="index">
      <el-tooltip placement="top">
        <div slot="content">
          {{generateFontIcon(item)}}
        </div>
        <div class="fontIconItem">
          <span :class="'fa '+item"></span>
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
  fontIcons: Array<string>
}

@Component
export default class Icon extends Vue{
  fontIcons = Icons['fontAwesomeIcons']

  public generateFontIcon(symbol) {
    return `<span class="fa ${symbol}"></span>`
  }
}
</script>

<style lang="less" scoped>
.fontIcon {
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
    background-color: rgba(187, 222, 251, 0.6);

    span {
      display: block;
      font-size: 16px;
      margin: 10px auto;
    }
  }
}
</style>