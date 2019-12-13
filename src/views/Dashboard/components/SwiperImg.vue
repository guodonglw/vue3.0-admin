<template>
  <div class="swiper">
    <el-carousel :interval="2000" arrow="always">
      <el-carousel-item v-for="(item,index) in pictures" :key="index">
        <img v-bind:src="item.imgUrl" style="width: 100%;height: 100%;" :alt="item.imgUrl"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SwiperImg extends Vue{
  pictures = [
    {
      imgUrl: require('@/assets/swiper/1.jpg')
    }, {
      imgUrl: require('@/assets/swiper/2.jpg')
    }, {
      imgUrl: require('@/assets/swiper/3.jpg')
    }, {
      imgUrl: require('@/assets/swiper/4.jpg')
    }
  ]
}
</script>

<style lang="less" scoped>
.swiper {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>