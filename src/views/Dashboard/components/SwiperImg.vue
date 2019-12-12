<template>
  <div class="swiper">
    <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="item in pictures" :key="item">
        <img :src="item" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SwiperImg extends Vue{
  pictures = [
    "http://lorempixel.com/640/480/food",
    "http://lorempixel.com/640/480/business",
    "http://lorempixel.com/640/480/sports",
    "http://lorempixel.com/640/480/fashion"
  ]
}
</script>

<style lang="less" scoped>
.swiper {
  flex: 0 0 50%;
  // border: 2px solid red;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>