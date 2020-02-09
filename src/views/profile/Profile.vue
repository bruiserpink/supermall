<template>
  <div class="Profile">
    <nav-bar class="navBar">
      <div slot="center">我的商城</div>
    </nav-bar>
    <profile-info :my-balance="myBalance"></profile-info>
    <else-info :my-balance="Balance" :my-discount="myDiscount" :my-integral="myIntegral"></else-info>
    <line-item>
      <img slot="icon" src="~assets/img/common/message.svg" alt="">
      <span slot="item-name">我的消息</span>
    </line-item>
    <line-item>
      <img slot="icon" src="~assets/img/common/shopping.svg" alt="">
      <span slot="item-name">积分商城</span>
    </line-item>
    <line-item>
      <img slot="icon" src="~assets/img/common/vip.svg" alt="">
      <span slot="item-name">会员卡</span>
    </line-item>
    <div class="downLoad">
      <line-item>
        <img slot="icon" src="~assets/img/common/cart.svg" alt="">
        <span slot="item-name">我的购物车</span>
      </line-item>
      <line-item>
        <img slot="icon" src="~assets/img/common/download.svg" alt="">
        <span slot="item-name">下载购物app</span>
      </line-item>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import ProfileInfo from "./childComps/ProfileInfo";
  import ElseInfo from './childComps/ElseInfo'
  import LineItem from "./childComps/LineItem";
  export default {
    name: "Profile",
    data() {
      return {
        myBalance: 0.00,
        myDiscount: 0,
        myIntegral: 0
      }
    },
    components: {
      NavBar,
      ProfileInfo,
      ElseInfo,
      LineItem
    },
    computed: {
      Balance() {
        return this.myBalance.toFixed(2);
      }
    }
  }
</script>

<style scoped>
  .Profile {
    height: 100vh;
    background: #F2F2F2;
  }
  .navBar {
    background: var(--color-tint);
    color: #fff;
    font-size: 16px;
  }
  .downLoad {
    margin-top: 10px;
  }
</style>
