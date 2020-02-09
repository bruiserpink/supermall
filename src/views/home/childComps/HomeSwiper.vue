<template>
  <swiper>
    <swiper-item v-for="item in banners" >
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper";
  export default {
    name: "HomeSwiper",
    components: {
      SwiperItem,
      Swiper
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    methods: {
      imageLoad() {
        //因为只需要加载一次轮播图就可以知道确切高度了，所以这里只发送一次
        if (!this.isLoad){
          this.$emit('swiperImagesLoad');
          this.isLoad = true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
