<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item">
        <img
           :src="item.imgUrl"
            alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import {getBannerApi} from "@/views/home/api/home.js"
import {onMounted, ref} from "vue";

const bannerList = ref([])
const getBannerList = () => {
  getBannerApi().then(({data: res}) => {
    bannerList.value=res.result
})
}
onMounted(() => {
  getBannerList()
})
</script>

<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
