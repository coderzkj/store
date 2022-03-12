<template>
  <div class="carousel">
    <div
      class="swiper-container"
      ref="Swiper"
    >
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="carousel in list"
          :key="carousel.id"
        >
          <img :src="carousel.imgUrl">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      //立即执行一次
      immediate: true,
      handler(newV, oldV) {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.Swiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>