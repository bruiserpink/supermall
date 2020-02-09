<template>
  <div class="detail-swiper">
    <swiper class="DetailSwiper">
      <swiper-item v-for="item in topImages">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: "DetailSwiper",
    props: {
      topImages: Array,
      default() {
        return []
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .DetailSwiper{
    height: 300px;
    overflow: hidden;
  }
</style>
