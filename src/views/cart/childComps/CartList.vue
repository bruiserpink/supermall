<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :product="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";
  export default {
    name: "CartList",
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters(["cartList"]),
    },
    components: {
      Scroll,
      CartListItem,
    },
    activated() {
      //当购物车路由活跃时，让其根据新的购物车数据刷新一下scroll高度
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 143px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
