<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      addToCart() {
        this.$emit('addToCart')
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 49px;
    position: relative;
    background-color: #fff;
    text-align: center;
    display: flex;
  }

  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item>div {
    flex: 1;
  }

  .bar-left {
    flex: 3;
  }
  .bar-left .text {
    font-size: 12px;
  }

  .bar-left .icon {
    display: block;
    width: 18px;
    height: 18px;
    margin: 8px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    background-position:0 -42px;
  }

  .bar-left .shop {
    background-position:0 -79px;
  }
  .bar-left .select {
    background-position:0 2px;
  }
  .bar-right {
    font-size: 13px;
    color: #fff;
    line-height: 30px;
    margin-top: 12px;
    flex: 4;
  }

  .bar-right .cart {
    background: linear-gradient(left,#FFC601,#FE9601);
    color: #fff;
    border-radius: 15px 0 0 15px;
    height: 30px;
    flex: 1;
  }

  .bar-right .buy {
    background: linear-gradient(left,#FE7701,#FE4C01);
    border-radius: 0 15px 15px 0;
    height: 30px;
    margin-right: 10px;
    flex: 1;
  }
</style>
