<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from './childComps/CartBottomBar'
  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      //直接使用mapGetters导入vuex的计算属性cartLength
      ...mapGetters(['cartLength']),
    }
  }
</script>

<style scoped>
  .cart {
    background: #eee;
    height: 100vh;
  }
  .nav-bar {
    background: var(--color-tint);
    color: #fff;
    margin-bottom: 10px;
    font-size: 16px;
  }
</style>
